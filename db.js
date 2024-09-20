
const mongoose = require("mongoose")

const connectToDB = async ()=>{
    await mongoose.connect(`${process.env.MONGODB_URL}`)
    .then(()=>{
        console.log("MongoDB Connected...")
    })
}

module.exports = connectToDB