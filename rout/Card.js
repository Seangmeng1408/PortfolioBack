const express=require("express")
const rout=express.Router()
const bcrypt=require("bcrypt")
const Card=require("../model/Card")
const {auth,Admin}=require("../Utiliti/authentication")
const Validation=require("../Utiliti/Card-Validation")
const ImageAcceptAble=["image/jpeg","image/png","image/gif"]
rout.get("/",async (req,res)=>{
    try{
        const All=await Card.find({});
        res.send(All);
    }catch(err){
        res.send(err);
    }
})

rout.get("/:id",async (req,res)=>{
    const id=req.params.id;
    const card=Card.findOne({_id:id})
})


rout.post("/",auth,async (req,res)=>{
    const {error}=Validation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const card=new Card({
        Title:req.body.Title,
        Description:req.body.Description,
        Cover:req.body.Cover,
        Cover_Type:req.body.Type,
        LiveUrl:req.body.LiveUrl,
        SourceUrl:req.body.SourceUrl,
        Owner:req.body.Owner
    })
    
    try{
        const Saved=await card.save()
        res.send(Saved);
    }catch(err){
        res.status(400).send(err)
    }
})

rout.delete("/delete/:id",auth,async (req,res)=>{
    const id=req.params.id;
    const card= await Card.findOneAndRemove({_id:id})
    .then((card) => {
        if (!card) {
            res.status(400).send(id + ' was not found');
        } else {
            res.status(200).send(id + ' was deleted.');
        }
        });
})

rout.put("/update/:id",auth,async(req,res)=>{
    const id=req.params.id;
    const option = {new: true} //will return updated document
    const card = await Card.findOneAndUpdate({_id:id} , req.body, option)
    return res.send(card);
})

module.exports=rout