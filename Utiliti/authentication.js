const jwt=require("jsonwebtoken")
const User=require("../model/User")
function auth(req,res,next){
    const token=req.header("auth-token")
    if(!token) return res.status(400).send({"message":"Access denie"})
    try{
        const verify=jwt.verify(token,process.env.TOKEN)
        next()
    }catch (err){
        res.send(err)
    }
}
function loggendIn(req,res,next){
    const token=req.header("auth-token")
    if(token) return res.status(400).send({"message":"already logged in"})
    try{
        const verify=jwt.verify(token,process.env.TOKEN)
        next()
    }catch (err){
        res.send(err)
    }
}
async function Admin(req,res,next){
    const token=req.header("auth-token")
    if(!token) return res.status(400).send({"message":"Access denie"})
    try{
        const verify=jwt.verify(token,process.env.TOKEN)
        const user=await User.findOne({_id:verify._id})
        if(!user) return res.status(400).send({"message":"auth-token invalid"})
        if(!user.Admin) return res.status(400).send({"message":"Access denie"})
        next()
    }catch (err){
        res.send(err)
    }
}


module.exports.auth=auth;
module.exports.Admin=Admin;