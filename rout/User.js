const express=require("express")
const rout=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const User=require("../model/User")
require("dotenv").config();
const {validation,loginValidation} =require("../Utiliti/Auth-Validation")
const {auth,Admin}=require("../Utiliti/authentication")


rout.get("/:id",async (req,res)=>{
    const id=req.params.id;
    const user= await User.findOne({_id:id})
    if(!user) return res.status(400).send({"message":"user not found"});
    res.send({"UserName":user.UserName,
            "Admin":user.Admin,
            })
})


rout.post("/register",Admin,async (req,res)=>{
    //check validation of data
    const {error}=validation(req.body);
    if(error) return res.status(400).send(error.details[0].message);


    //check is email already exist or not?
    const emailExis=await User.findOne({Email:req.body.Email})
    if(emailExis) return res.status(400).send({"message":"Email already exist"})

    const salt= await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(req.body.Password,salt)
    const user=new User({
        Email:req.body.Email,
        UserName:req.body.UserName,
        Password:hashPassword,
        Admin:req.body.Admin
    })

    try{
        const UserSave=await user.save();
        res.send({"_id":UserSave._id});
    }catch{
        res.send({"Message":"it not work"});
    }
})



rout.post("/login",async (req,res)=>{

    //check validation of data
    const {error}=loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message);


    //check is email already exist or not?
    const user=await User.findOne({Email:req.body.Email})
    if(!user) return res.status(400).send({"message":"Email or Password invalid"})

        const ValidPass=await bcrypt.compare(req.body.Password,user.Password);
        if(!ValidPass) return res.status(400).send({"message":"Email or Password invalid"})
    

        const token=jwt.sign({_id:user._id},process.env.TOKEN)
        res.header("auth-token",token).send(token);

})



rout.delete("/delete/:id",Admin,async (req,res)=>{
    const id=req.params.id;
    const user= await User.findOneAndRemove({_id:id})
    .then((user) => {
        if (!user) {
            res.status(400).send(id + ' was not found');
        } else {
            res.status(200).send(id + ' was deleted.');
        }
        });
})


rout.put("/update/:id",Admin,async(req,res)=>{
    const id=req.params.id;
    const option = {new: true} //will return updated document
    const user = await User.findOneAndUpdate({_id:id} , req.body, option)
    return res.send(user);
})

module.exports=rout