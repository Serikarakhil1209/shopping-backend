const express = require('express')
const Router = express.Router();
const {signupControll,loginControll} = require("../Controller/authController.js")
const {signupvalidator} = require("../Validators/authvalidators.js")


Router.post("/signup",signupvalidator,signupControll)
Router.post("/login",loginControll)


module.exports = Router