
const mongoose = require("mongoose");


const Card=mongoose.Schema({
    Titile:{
        type:String,
        min:1,
        max:255
    },
    Description:{
        type:String,
        min:1
    },
    Cover:String,
    Cover_Type:String,
    Owner:String,
    CreateDate:{
        type:Date,
        default:Date.now()
    }
})

// Card.virtual("CoverImagePath").get(function(){
//     if(this.Cover!=null && this.Cover_Type!=null){
//         return `data:${this.Cover_Type};charset=utf-8;base64,${this.Cover}`;
//     }
// })

module.exports=mongoose.model("Card",Card)
// module.exports.CoverImagePath=CoverImagePath