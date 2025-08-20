const express = require('express')
const app = express()
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

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/auth',authroute)
app.use('/admin',adminroute)
app.use('/Products',Productsroute)
app.use("/user",cartroute)
app.use("/order",orderroute)



app.use(errorboundary)
app.listen(process.env.port,()=>{
    console.log("server is running on this port number" , process.env.port)
})