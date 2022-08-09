const mongoose=require("mongoose");


const User=mongoose.Schema({
    Email:{
        type:String,
        min:5,
        max:255
    },
    UserName:{
        type:String,
        min:1,
        max:255
    },
    Password:{
        type:String
    },
    Admin:Boolean,
    CreateTime:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model("User",User)