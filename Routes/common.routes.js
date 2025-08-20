const express = require("express")
const route = express.Router()

const {AllProducts,Product} = require("../Controller/Common.controller.js")

route.get("/",AllProducts)
route.get("/Product/:id",Product)
module.exports = route