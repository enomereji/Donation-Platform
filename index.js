const express = require("express")

const dotenv = require("dotenv").config()

const mongoose = require("mongoose")
const connectToDB = require("./db")

const app = express()

app.use(express.json())

connectToDB()

const PORT = process.env.PORT || 5000

mongoose.connect(`${process.env.MONGODB_URL}`)
.then(()=> console.log("Database Connected...!"))

app.listen(PORT, ()=>{
    console.log(`Server started Running on Port ${PORT}`)
})