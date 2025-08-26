const mongoose = require("mongoose");

const orderschema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userscollection",
    required: true
  },

  products: [{
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true
    },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 }
  }],

  total_amount: { type: Number, required: true, min: 0 },

  paymentmode: {
    type: String,
    enum: ["COD", "UPI"],
    required: true,
    default:"UPI"
  },

  upi_id: { type: String }, 

  paymentstatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },

  status: {
    type: String,
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
    default: "pending"
  },
  user_cancel : {
    type:String,
    enum:["cancel"]
  },
  address: {
    fullname: { type: String, required: true },
    mobile: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
  }

}, { timestamps: true });

const ordermodel = mongoose.model("orders", orderschema);
module.exports = { ordermodel };
