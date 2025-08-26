const express = require("express")
const route = express.Router()
const {addproduct,updateproduct,deleteproduct} = require("../Controller/admin.controller.js")
const {upload} = require("../Utils/fileuplode.js")
const {verifytoken} = require("../Middleware/tokenverify.js")
const {rolebaseauth} = require("../Middleware/rolebasedauth.js")

route.post("/post/product",verifytoken,rolebaseauth,upload.array("images",3),addproduct)
route.delete("/delete/product/:id",verifytoken,rolebaseauth,deleteproduct)
route.put("/put/product/:id",verifytoken,rolebaseauth,upload.array("images",3),updateproduct)

module.exports=route