const express = require("express")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")

const authRoutes = require("./routes/authRoutes")
const causeRoutes = require("./routes/causeRoutes")

const path = require("path")

const connectToDB = require("./db.js")

const app = express()

const PORT = process.env.PORT || 5000

connectToDB()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.listen(PORT, ()=>{
    console.log(`Server started Running on Port ${PORT}`)
})

app.use("/api", authRoutes)
app.use("/api", causeRoutes)

app.use((request, response) => {
    response.status(404).json({
        message: "Welcome to our server, this endpoint does not exist!"
    })
})