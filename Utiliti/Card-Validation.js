const Joi=require("@hapi/joi");


const validation=(data)=>{
    const schema=Joi.object({
        Title:Joi.string().min(1).required(),
        Description:Joi.string().min(1).required(),
        Owner:Joi.string().min(1).required(),
        Cover:Joi.string().required(),
        Cover_Type:Joi.string(),
        LiveUrl:Joi.string().required(),
        SourceUrl:Joi.string().required()
    })

    return schema.validate(data);
}

module.exports=validation;