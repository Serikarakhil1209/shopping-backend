const { usermodel } = require("../Models/userschema.js");

const rolebaseauth = async (req, res, next) => {
  try {
    const id = req.user.id;
    const user = await usermodel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ message: "No access" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  rolebaseauth,
};
