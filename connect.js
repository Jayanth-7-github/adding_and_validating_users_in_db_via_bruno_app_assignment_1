const mongoose=require("mongoose")
require("dotenv").config()

const connect=mongoose.connect(process.env.mongodb)
.then(()=>console.log("Connected successfully"))
module.exports={connect}