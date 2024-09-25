const express = require("express")
const router = express.Router()
const causeController = require("../controllers/causeController")
const authenticateJWT = require("../middleware/authMiddleware")

router.post("/create-cause", authenticateJWT, causeController.createCause)

router.get("/causes", causeController.getAllCauses)

router.get("/causes/:id", authenticateJWT, causeController.getCauseById)

router.put("/causes/:id", authenticateJWT, causeController.updateCause)

router.delete("/causes/:id", authenticateJWT, causeController.deleteCause)


module.exports = router