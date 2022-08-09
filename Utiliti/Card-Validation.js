const Joi=require("@hapi/joi");


const validation=(data)=>{
    const schema=Joi.object({
        Title:Joi.string().min(1).required(),
        Description:Joi.string().min(1).required(),
        Owner:Joi.string().min(1).required(),
        Cover:Joi.string()
    })

    return schema.validate(data);
}

module.exports=validation;