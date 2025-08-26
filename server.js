const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const authroute = require("./Routes/authRoute.js")
const {errorboundary} = require("./Middleware/errorMiddleware.js")
const {createdb}=require("./Config/configdb.js")
createdb()
const adminroute = require("./Routes/admin.routes.js")
const Productsroute = require("./Routes/common.routes.js")
const cartroute = require("./Routes/user.routes.js")
const orderroute = require("./Routes/order.route.js")
const promoroute = require("./Routes/Promo.route.js")

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use('/auth',authroute)
app.use('/admin',adminroute)
app.use('/Products',Productsroute)
app.use("/user",cartroute)
app.use("/order",orderroute)
app.use("/promo",promoroute)
app.use("/",(req,res)=>{
  res.send("bhai nothing to see here ")
})


app.use(errorboundary)
app.listen(process.env.port,()=>{
    console.log("server is running on this port number" , process.env.port)
})