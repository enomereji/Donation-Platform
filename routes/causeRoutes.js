const express = require("express")
const { createCause } = require("../controllers/causeController")
const authenticateJWT = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/create-cause", authenticateJWT, createCause)


module.exports = router