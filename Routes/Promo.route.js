const express = require("express");
const router = express.Router();
const {addVideo,deletevideo,getvideo} = require("../Controller/Promo.controller.js")
const {upload} = require("../Utils/fileuplode.js")
const {verifytoken} = require("../Middleware/tokenverify.js")
const {rolebaseauth} = require("../Middleware/rolebasedauth.js")

router.post("/post",verifytoken,rolebaseauth,upload.array("promo",3),addVideo)
router.post("/get",verifytoken,rolebaseauth,getvideo)
router.delete("/delete",verifytoken,rolebaseauth,deletevideo)

module.exports =router
