const axios = require('axios');

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY

// Verify Payment
const verifyPayment = async (reference) => {
  try {
  const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: { 
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` 
    },
  });
  const paymentData =  response.data;
  if (paymentData.status && paymentData.data.status === "success") {
    return paymentData.data
  } else {
    return null
  }
} catch (error) {
  console.error("Error verifying payment:", error)
  throw new Error("Payment verification failed")
}
}

// Initialize Payment
const initializePayment = async (paymentData) => {
  const response = await axios.post('https://api.paystack.co/transaction/initialize', paymentData, {
    headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
  });
  return response.data;
};

module.exports = {
  verifyPayment,
  initializePayment,
};
