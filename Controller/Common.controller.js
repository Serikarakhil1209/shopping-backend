const {adminmodel} = require("../Models/adminschema")

const AllProducts = async(req,res,next)=>{
try {
    const data = await adminmodel.find();
    res.status(200).json(data)
} catch (error) {
    next(error)
}

}


const Product = async(req,res,next)=>{
   try {
    const {id }= req.params
    const data = await adminmodel.findById({_id:id});
    res.status(200).json(data)
} catch (error) {
    next(error)
} 
}
module.exports = {
    AllProducts,
    Product
}