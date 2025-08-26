const { request } = require("express")
const {addtocart} = require("../Models/addtocartschema.js")
const {adminmodel} = require("../Models/adminschema.js")

const addProdcttocart = async (req, res, next) => {
    const user_id = req.user.id; // taken from token
    const { quantity, size, product_id } = req.body;

    try {
        
        const data = await addtocart.findOne({ product_id: product_id, user_id: user_id });
        // we are checking product is precent in db or noy
        if (data) {
            const newQuantity = await addtocart.findOneAndUpdate(
                { product_id: product_id, user_id: user_id },
                { $inc: { quantity: 1 } }, // Increment quantity
                { new: true }
            );

            return res.status(200).json({
                message: "Quantity updated in the cart",
                newQuantity
            });
        }

        // Add new product to cart
        const newData = new addtocart({
            user_id: user_id,
            product_id: product_id,
            quantity: quantity,
            size: size
        });

        const newProduct = await newData.save();
        return res.status(200).json({
            message: "Product added to the cart",
            newProduct
        });

    } catch (error) {
        next(error);
    }
};


const getproducts = async (req, res, next) => {
    try {
        const userId = req.user.id; 
        const cart_items = await addtocart.find({ user_id: userId })
            .populate("product_id", ["_id", "product_name", "product", "product_category", "price", "size", "quantity", "description", "images"]);

        if (cart_items.length === 0) { 
            return res.status(200).json({ message: "Cart is empty" });
        }

        return res.status(200).json(cart_items); 
    } catch (error) {
        next(error);
    }
};


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