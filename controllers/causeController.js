const { request } = require("express")
const Cause = require("../models/Cause")

const createCause = async (request, response) => {
    try {
        const { title, description, goal_amount, organizer } = request.body
        
        if (!title || !description || !goal_amount || !organizer) {
            return response.status(400).json({ message: "All fields are required." })
        }

        const newCause = new Cause ({
            title, 
            description,
            goal_amount,
            raised_amount: 0,
            organizer: request.user.id
        })

        await newCause.save()

           return response.status(201).json({ message: "Cause created successfully", cause: newCause })
        } catch (error) {
            console.error(error)
            return response.status(500).json({ error: "Failed to create cause", error: error.message })
        }
    }

const getAllCauses = async (requesr, response) => {
    try {
        const causes = await Cause.find()
        response.status(200).json(causes)
    } catch (error) {
        console.error(error)
        response.status(500).json({ error: "Failed to retrieve causes" })
    }
}

const getCauseById = async (request, response) => {
    try {
        const cause = await Cause.findById(request.params.id)
        if (!cause) {
            return response.status(404).json({ error: "Cause not found" })
        }
        response.status(200).json(cause)
    } catch (error) {
        console.error(error)
        response.status(500).json({ error: "Failed to retrieve cause" })
    }
}

const updateCause = async (request, response) => {
    try {
        const { id } = request.params
        const { title, description, goal_amount } = request.body
        const cause = await Cause.findById(id)

        if (!cause) {
            return response.status(400).json({ error: "Cause not found" })
        }

        if (cause.organizer.toString() !== request.user._id.toString() && req.user.role !== "admin") {
            return response.status(403).json({ error: "Unauthorized to update this cause" })
        }

        cause.title = title
        cause.description = description
        cause.goal_amount = goal_amount

        await cause.save()
        return response.status(200).json({ message: "Cause updated successfully", cause })
    } catch (error) {
        console.error(error)
        return response.status(500).json({ error: error.message })
    }
}

const deleteCause = async (request, response) => {
    try {
        const { id } = request.params
        const cause = await Cause.findById(id)

        if (!cause) {
            return response.status(404).json({ error: "Cause not found" })
        }

        if (cause.organizer.toString() !== request.user._id.toString() && request.user.role !== "admin") {
            return response.status(403).json({ error: "Unauthorized to delete this cause" })
    } 

    await Cause.findByIdAndDelete(id)

    return response.status(200).json({ message: "Cause deleted successfully"})
    
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: error.message })
  }
}

module.exports = {
    createCause,
    getAllCauses,
    getCauseById,
    updateCause,
    deleteCause
}