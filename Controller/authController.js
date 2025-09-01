const bcrypt = require("bcrypt")
const {usermodel} = require("../Models/userschema.js")
const {createToken} = require("../Utils/GenrateToken.js")

const signupControll = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    
    const existingUser = await usermodel.findOne({ email: email });
    if (existingUser) {
      return next({
        message: "User already exists",
        statusCode: 409,
      });
    }

   
    const hashedPassword = bcrypt.hashSync(password, 12);

    
    const newUser = new usermodel({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

   
    const token = await createToken(savedUser);

    res.status(201).json({
      message: "Signup successful",
      user: savedUser,
      token,
    });
  } catch (error) {
    next(error);
  }
};


const  loginControll = async(req , res , next) =>{
    const {email,password} = req.body
    const user =await usermodel.findOne({email:email})
    if(!user){
      return next({
              statusCode: 401,
                message: "Wrong email",
                errors: []
      })
    }

    const encoded = await bcrypt.compare(password,user.password)
    if(!encoded){

       return next({
                statusCode: 401,
                message: "Wrong password",
                errors: []
      })

    }
   
   const token = await createToken(user)
   user.password = undefined;
    res.status(200).json({
      message:"login sucessfull",
      user ,
      token
    })
}

module.exports = {
    signupControll,
    loginControll
}