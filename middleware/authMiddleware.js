const jwt = require("jsonwebtoken")

const authenticateJWT = (request, response, next) => {
    const token = request.header("Authorization") && request.header("Authorization").split(" ")[1]

    if (!token) {
        return response.status(401).json({ error: "Access denied. No token provided."})
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)
        request.user = decoded

        next()
    }   catch (error) {
        response.status(400).json({ error: "Invalid token"})
    }
}

module.exports = authenticateJWT