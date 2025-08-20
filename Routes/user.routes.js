const express = require("express")
const route = express.Router()
const {addProdcttocart , getproducts,removeProduct} = require("../Controller/user.controller.js")
const {verifytoken} = require("../Middleware/tokenverify.js")

route.post("/add",verifytoken,addProdcttocart)
route.get("/getProducts",verifytoken,getproducts)
route.delete("/remove/:id",verifytoken,removeProduct)

module.exports = route