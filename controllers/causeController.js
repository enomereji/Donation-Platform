const createCause = require("../models/Cause")

const newCause = async (request, response) => {
    try {
        const { title, description, goal_amount } = request.body

        const newCause = {
            title, 
            description,
            goal_amount,
            raised_amount: 0,
            organizer: request.user.id
        }

        await newCause.save()

            response.status(201).json({ message: "Cause created successfully", cause: newCause})
        }   catch (error) {
            console.error(error)
            response.status(500).json({ error: "Failed to create cause"})
        }
    }


module.exports = {
    createCause
}