const { adminmodel } = require("../Models/adminschema.js");
const { cloudinaryfileupload } = require("../Utils/cloudnary.js");
const fs = require("fs");


const addproduct = async (req, res, next) => {
  const { product_name, product_category, price, size, quantity, description, product } = req.body;
  const pictures = req.files;
  const imageUrls = [];

  try {
    for (let pic of pictures) {
      const uploaded = await cloudinaryfileupload(pic.path);
      imageUrls.push(uploaded);
      fs.unlinkSync(pic.path);
    }

    const newproduct = new adminmodel({
      product_name,
      product,
      product_category,
      price,
      size,
      quantity,
      description,
      images: imageUrls,
    });

    const data = await newproduct.save();
    res.status(200).json("Product added .. ");
  } catch (error) {
    next(error);
  }
};


const updateproduct = async (req, res, next) => {
  const { product_name, product_category, price, size, quantity, description, product } = req.body;
  const pictures = req.files;
  const imageUrls = [];

  try {
    for (let pic of pictures) {
      const uploaded = await cloudinaryfileupload(pic.path);
      imageUrls.push(uploaded);
      fs.unlinkSync(pic.path);
    }

    const { id } = req.params;
    const result = await adminmodel.updateOne(
      { _id: id },
      {
        $set: {
          product_name,
          product,
          product_category,
          price,
          size,
          quantity,
          description,
          images: imageUrls,
        },
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Product not found or no changes made" });
    }

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    next(error);
  }
};


const deleteproduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await adminmodel.deleteOne({ _id: id });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addproduct,
  deleteproduct,
  updateproduct,
};
