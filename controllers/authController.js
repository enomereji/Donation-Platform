const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const loginUser = async (request, response) => {
    try {
        const { email, password } = request.body

        const user = await User.findOne({ email })
        if (!user) {
            return response.status(400).json({ error: "Invalid email or password"})
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password)
        if (!isPasswordValid) {
            return response.status(400).json({ error: "Invalid email or password"})
        }

        const accessToken = jwt.sign({user}, `${process.env.ACCESS_TOKEN}`, {expiresIn: "20m"})

        const refreshToken = jwt.sign({user}, `${process.env.REFRESH_TOKEN}`, {expiresIn: "1d"})

        response.status(200).json({ message: "Login successful", accessToken})
    }   catch (error) {
        response.status(500).json({ error: "Login failed, try again"})
    }

}

const registerUser = async (request, response) => {
    try {
        const { name, email, password, role } = request.body

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return response.status(400).send("User already exists")
        }

        const hashedPassword = await bcryptjs.hash(password, 10)

        const newUser = new User({
            name, 
            email,
            password: hashedPassword,
            role
        })

        await newUser.save()

        response.status(201).send("User registered successfully")
    }   catch (error) {
        console.error(error)
        response.status(500).send("Server error")
    }
}

module.exports = {
    loginUser,
    registerUser
}