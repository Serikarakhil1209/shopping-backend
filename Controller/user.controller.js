const { request } = require("express")
const {addtocart} = require("../Models/addtocartschema.js")
const {adminmodel} = require("../Models/adminschema.js")

const addProdcttocart = async(req,res,next)=>{
user_id = req.user.id // i have taken from token 
const {product_id, quantity} = req.body
try {
const data = await addtocart.findOne({
    product_id:product_id
})
if(data){
 
    const newqunatity = await addProdcttocart.findByIdAndUpdate({    product_id:product_id
}, { $inc: { quantity: 1 } },    // increment quantity by 1
        { new: true }    )    
    return res.status(200).json({ "message": "Quantity updated in the cart",  newqunatity});
}

const newdata = new addtocart({
    user_id:user_id,
    product_id:product_id,
    quantity:quantity
})

const newProduct = await newdata.save()
return res.status(200).json({
    message:"added bro",
    newProduct
})


} catch (error) {
   next(error) 
}} 

const getproducts = async(req,res,next)=>{
products_array = []
id = req.user.id
try {
    
const cart_items = await addtocart.find({
    user_id:id
}).populate("product_id",["_id", "product_name", "product", "product_category", "price", "size", "quantity", "description", "images"])

console.log(cart_items)
if(!cart_items){
    return res.status(400).json({message:"no items"})
}

// for( let item of cart_items){
//     const oneitem = await adminmodel.findOne({_id:item.product_id})
//     products_array.push(oneitem)
// }
if(products_array.length === 0){
    res.status(400).json({message:"empty cart"})
}
res.status(201).json(cart_items)
} catch (error) {
next(error)    
}
}

const removeProduct = async(req,res,next)=>{
    const {id} = req.params
    console.log(id)
    
    try {
        await addtocart.deleteOne({
            product_id : id
        })
        res.status(204).json({
            message:"removed from cart"
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addProdcttocart,
    getproducts,
    removeProduct
}