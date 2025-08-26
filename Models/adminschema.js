const mongoose = require("mongoose")

const adminschema = mongoose.Schema({
    product_name : {type:String,required:true},
    product:{type:String,required:true},
    product_category : {type:String,required:true},
    price:{type:String,required:true},
    size:{
        type:[String],
    
    },
   description : {
    type:String,
    required:true
   },
  images :{
    type:[String]
  }

})
const adminmodel = mongoose.model("products",adminschema)

module.exports={
    adminmodel
}