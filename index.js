const express=require("express")
const app=express()
const DotEnv=require("dotenv");
const mongoose=require("mongoose")
const UserRout=require("./rout/User");
const CardRout=require("./rout/Card");
var cors = require('cors')
const bodyParser=require("body-parser")
DotEnv.config()
app.use(cors())
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({limit: '50mb',extended:false}))
mongoose.connect(
    process.env.DB_CONNECTION,
    ()=>{
        console.log("DB connection")
    }
)


app.use("/api/user",UserRout)
app.use("/api/Card",CardRout)

Port=3000
app.listen(process.env.PORT||Port)