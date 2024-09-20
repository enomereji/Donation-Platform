const mongoose = require("mongoose")

const causeSchema = new mongoose.Schema({
    title: String,
    description: String,
    goal_amount: Number,
    raised_amount: { type: Number, default: 0 },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

const Cause = mongoose.model("Cause", causeSchema)

module.exports = Cause
