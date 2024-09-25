const express = require("express")
const donationController = require("../controllers/donationController")
const authenticateJWT = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/initiate-donation", authenticateJWT, donationController.initiateDonation)
router.get("/verify-payment/:reference", donationController.verifyPayment)
router.post("/donate", authenticateJWT, donationController.updateRaisedAmount)
router.get("/donations", donationController.getAllDonations)


module.exports = router