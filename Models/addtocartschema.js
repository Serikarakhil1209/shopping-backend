const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
   user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",   
      required: true
   },
   product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",  
      required: true,
   },
   quantity: {
      type: Number,
      required: true,
      default: 1
   },
   size :{
       type:String,
       required:true
   }
});

const addtocart = mongoose.model("cart", userschema);

module.exports = {
   addtocart
};
