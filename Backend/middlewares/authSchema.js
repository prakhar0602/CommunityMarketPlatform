const Joi = require('joi');

const loginSchema = Joi.object({
    email:Joi.string().email({tlds:{allow:['com','net']}}).required(),
    password:Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$'))
    .messages({
        "string.min":"The password must be atleast 8 characters long.",
        "string.pattern.base":"Password must include atleast one lowercase alphabet, one uppercase alphabet, one number and one special character"
    }).required()
})

const signupSchema = Joi.object({
    name:Joi.string().required(),
    location:Joi.string().required(),
    email:Joi.string().email({tlds:{allow:['com','net']}}).required(),
    password:Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$')).messages({
        "string.min":"The password must be atleast 8 characters long",
        "string.pattern.base":"Password must include atleast one lowercase alphabet, one uppercase alphabet and ne special character"
    }).required(),
    repeat_password:Joi.ref('password')
})


const validateLogin = (req,res,next) => {
    let {email,password}=req.body
    const {error} = loginSchema.validate({email,password})
    if(error){
        res.status(200).json({bool:false,msg:error.details[0].message})
    }
    else{
        next();
    }
}

const validateSignup = (req,res,next) => {
    let {name,email,password,repeat_password,location} = req.body;
    const {error} = signupSchema.validate({name,email,password,repeat_password,location});
    if(error){
        console.log(error.details[0].message)
        res.status(500).json({bool:false,msg:error.details[0].message})
    }
    else{
        next();
    }
}

//Implement JWT

module.exports = {validateLogin,validateSignup};