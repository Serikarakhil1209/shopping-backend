const express = require("express");
const route = express.Router();
const { placeorder, viewallorders, updatefileds ,vieworders,cancelorder } = require("../Controller/order.controller.js");
const { verifytoken } = require("../Middleware/tokenverify.js");
const {rolebaseauth} = require("../Middleware/rolebasedauth.js")


route.post("/user/post", verifytoken, placeorder)
route.get("/user/get",verifytoken,vieworders)
route.delete("/user/delete/:id",verifytoken,cancelorder);

route.get("/admin/all", verifytoken,rolebaseauth, viewallorders)         
route.put("/admin/update/:id", verifytoken,rolebaseauth, updatefileds)  

module.exports = route;
