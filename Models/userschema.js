const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true   
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true, 
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6 
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, { timestamps: true }); 

const usermodel = mongoose.model("userscollection", userschema);

module.exports = { usermodel };
