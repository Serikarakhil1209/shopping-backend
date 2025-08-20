const jwt = require("jsonwebtoken")

require("dotenv").config()


//token will be genrated here 

async function createToken (user,req,res){
   try {
   const token = await jwt.sign({id:user._id},process.env.secrete_key , {expiresIn:"24h"} )
   return token
   } catch (error) {
     next(
      error
     )
   }
}














module.exports = {
    createToken
}


