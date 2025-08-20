const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifytoken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "No token provided or invalid format" });
  }

  const token = authorization.split(" ")[1];

  try {
    const data = jwt.verify(token, process.env.secrete_key); 
    req.user = data; 
    next();
  } catch (error) {
    next(error)
  }
}

module.exports = { verifytoken };
