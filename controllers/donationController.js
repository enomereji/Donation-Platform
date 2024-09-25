const paystack = require("paystack-api")(process.env.PAYSTACK_SECRET_KEY)
const Donation = require("../models/Donation")
const { verifyPayment: paystackVerifyPayment } = require("../services/paystackService")
const Cause = require("../models/Cause")
const { request, response } = require("express")

const initiateDonation = async (request, response) => {
    const { causeId, amount, paymentReference } = request.body;
    const user = request.user; 
  
    try {
      
      if (paymentReference) {
        const payment = await verifyPayment(paymentReference);
  
        if (!payment || payment.status !== 'success') {
          return response.status(400).json({ error: 'Payment failed or invalid' });
        }
  
        
        const cause = await Cause.findById(causeId);
        if (!cause) {
          return response.status(404).json({ error: 'Cause not found' });
        }
  
        cause.raised_amount += amount;
        await cause.save();
  
        const donation = await Donation.findOne({ _id: payment.reference }); // Assuming the reference is donation._id
        donation.paymentReference = paymentReference;
        donation.status = 'completed';
  
        await donation.save();
  
        return response.status(200).json({
          message: 'Donation successful, raised amount updated',
          cause,
          donation,
        });
      } else {
        
        const donation = new Donation({
          donor: user._id,
          cause: causeId,
          amount,
          status: 'pending',
        });
  
        await donation.save(); 

        const paymentResponse = await initializePayment({
          amount: amount * 100, 
          email: user.email,
          reference: donation._id.toString(),
          callback_url: `${process.env.FRONTEND_URL}/payment-success`,
        });
  
        return response.status(200).json(paymentResponse.data);
      }
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: 'Error processing donation' });
    }
  };

const verifyPayment = async (request, response) => {
    const { reference } = request.params

    try {
        const payment = await paystackVerifyPayment(reference)

        if (!payment) {
            return response.status(400).json({ error: "Payment verification failed"})
        }

        return response.status(200).json({
            message: "Payment verification successful",
            payment
        })
    } catch (error) {
        console.error(error)
        return response.status(500).json({ error: "An error occured during payment verification" })
    }
}

const updateRaisedAmount = async (request, response) => {
    const { causeId, amount } = request.body

    try {
        const cause = await Cause.findById(causeId)
        if (!cause) {
            return response.status(404).json({ error: "Cause not found" })
        }

        cause.raised_amount += amount

        await cause.save()

        const donation = new Donation({
            donor: request.user._id,
            cause: causeId,
            amount,
            status: "completed"
        })

        await donation.save()

        return response.status(200).json({
            message: "Donation successful, raised amount updated",
            cause,
            donation,
        })
    } catch (error) {
        console.error(error)
        response.status(500).json({ error: "Eroor updating raised amount" })
    }
}

const getAllDonations = async (req, res) => {
    try {
      const donations = await Donation.find({});
      res.status(200).json(donations);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching donations', error });
    }
  };

module.exports = {
    initiateDonation,
    updateRaisedAmount,
    getAllDonations,
    verifyPayment,
}