const { addtocart } = require("../Models/addtocartschema.js");
const { ordermodel } = require("../Models/orders.schema.js");


const placeorder = async (req, res, next) => {
  try {
    const user_id = req.user.id;

    const cartitems = await addtocart.find({ user_id }).populate("product_id");

    if (cartitems.length === 0) {
      return res.status(200).json({ message: "Cart is empty" });
    }

    const Products = cartitems.map((item) => ({
      product_id: item.product_id._id,
      quantity: item.quantity,
      price: item.product_id.price,
    }));

    const total_amount = Products.reduce(
      (acc, p) => acc + p.price * p.quantity,
      0
    );

    const order = new ordermodel({
      user_id,
      products: Products,
      total_amount,
    });

    await order.save();


    await addtocart.deleteMany({ user_id });

    res.status(200).json({
      message: "Thanks for placing Order",
      order,
    });
  } catch (error) {
    next(error);
  }
};


const vieworders = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const orders = await ordermodel.find({ user_id });
    res.status(200).json({ orders });
  } catch (error) {
    next(error);
  }
};


const cancelorder = async (req, res, next) => {
  try {
    const { id } = req.params;
    await ordermodel.findByIdAndDelete(id);
    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (error) {
    next(error);
  }
};

// this for admin bro 
const viewallorders = async (req, res, next) => {
  try {
    const allOrders = await ordermodel.find();
    res.status(200).json(allOrders);
  } catch (error) {
    next(error);
  }
};


const updatefileds = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { paymentstatus, status } = req.body;

    const updatedOrder = await ordermodel.findByIdAndUpdate(
      id,
      { paymentstatus, status },
      { new: true }
    );

    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  placeorder,
  vieworders,
  cancelorder,
  viewallorders,
  updatefileds,
};
