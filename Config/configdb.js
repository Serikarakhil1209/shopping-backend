const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

async function createdb (){
console.log(process.env.connect_string)
try {
    await mongoose.connect( process.env.connect_string,{dbName:"users"})
    console.log("db is connected")
} catch (error) {
    console.log("error:   ",error)
}
}
module.exports = {createdb}