const { body, validationResult } = require("express-validator");

exports.signupvalidator = [
  body("name")
    .isLength({ min: 3, max: 30 })
    .trim()
    .withMessage("Name must be 3–30 characters"),

  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid email address"),

  body("password")
    .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1 })
    .withMessage("Password must be at least 8 chars, include 1 uppercase, 1 lowercase, 1 number"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
    } else {
      const err = {
        status: 400,
        message: "validation error",
        errors: errors.array()
      };
      console.log(err);
      next(err);
    }
  }
];
