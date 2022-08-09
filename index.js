const express=require("express")
const app=express()
const DotEnv=require("dotenv");
const mongoose=require("mongoose")
const UserRout=require("./rout/User");
const CardRout=require("./rout/Card");
const bodyParser=require("body-parser")
DotEnv.config()

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
app.listen(Port,()=>{
    console.log(`It run on http://localhost:${Port}`)
});