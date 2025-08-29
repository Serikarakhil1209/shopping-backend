const bcrypt = require("bcrypt")
const {usermodel} = require("../Models/userschema.js")
const {createToken} = require("../Utils/GenrateToken.js")

const signupControll = async(req,res,next)=>{
  const {name, email , password} = req.body
  const decode = bcrypt.hashSync(password,12) 
  try {
    const data = new usermodel({
      name:name,
      email:email,
      password:decode
    })
    const user = await  data.save()
    const token = await createToken(user)
    res.status(200).json({
      message:"signup sucessfull",
      user ,
      token
    })
  } catch (error) {
    next(error)
  }
}

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