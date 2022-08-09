const Joi=require("@hapi/joi");


const validation=(data)=>{
    const schema=Joi.object({
        Email:Joi.string().min(3).required().email(),
        UserName:Joi.string().min(6).required(),
        Password:Joi.string().min(8).required(),
        Admin:Joi.boolean().required()
    })

    return schema.validate(data);
}

const loginValidation=(data)=>{
    const schema=Joi.object({
        Email:Joi.string().min(3).required().email(),
        Password:Joi.string().min(8).required()
    })

    return schema.validate(data);
}

module.exports.validation=validation;
module.exports.loginValidation=loginValidation;