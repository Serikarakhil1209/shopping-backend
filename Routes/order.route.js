const express = require("express");
const route = express.Router();
const { placeorder, viewallorders, updatefileds ,vieworders,cancelorder } = require("../Controller/order.controller.js");
const { verifytoken } = require("../Middleware/tokenverify.js");


route.post("/user/post", verifytoken, placeorder)
route.get("/user/get",verifytoken,vieworders)
route.delete("/user/delete",verifytoken,cancelorder);

route.get("/admin/all", verifytoken, viewallorders)         
route.put("/admin/update/:id", verifytoken, updatefileds)  

module.exports = route;
