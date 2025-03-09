const user = require('../models/Users');
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken');
const Users = require('../models/Users');
const Conversations = require('../models/Conversations');

const handleAddUser = async (req, res) => {
    try { 
        let { name, email,password, location,profile_picture} = req.body;
        let User = await user.find({email})
        if(User!=undefined){
            let hashpass = await bcrypt.hash(password,10);
            let x=await user.create({ name, email, password:hashpass ,location });
            res.status(201).json({ bool:true, msg: 'Registered' });
        }
        else{
            res.status(200).json({bool:false, msg:'Email already registered'})
        }}
    catch (error) { 
        console.log(error.message)
        res.status(200).json({ bool:false , msg:"Something went wrong" });
    }
}

const handleGetUser = async(req,res)=>{
    try{
        let { id } = req.query;
        console.log(id)
        let User = await user.findById(id).populate("myItems").exec();
        console.log(User)
        res.status(200).json({bool:true,User,msg:"User Found"});
    }
    catch(error){
        console.log(error.message)
        res.status(200).json({bool:false,msg:'User not Found'});
    }
}
const handleGetAllUsers = async(req,res)=>{
    try{
        let Users = await user.find();
        res.json({bool:true,Users,msg:"returned all users"});
    }
    catch(error){
        res.json({bool:false,msg:"Something went Wrong"});
    }
}
const updateUser = async(req,res)=>{
    try{
        let{name,email,location,profile_picture,id} = req.body;
        let User = await user.findById(id);
        if(name!="")
            User.name=name;
        if(email!="")
            User.email=email;
        if(location!="")
            User.location=location;
        if(profile_picture!="")
            User.profile_picture=profile_picture;
        await User.save();
        res.status(200).json({bool:true,user:User});
    }
    catch(e){
        console.log(e.message)
        res.status(200).json({bool:false});
    }
}
const handleLogin = async (req, res) => { 
    try {
        let { email,password } = req.body;
        let users = await user.findOne({ email });
        if(users){
            await bcrypt.compare(password,users.password,async function(err,result){
                if(result){
                    let token = jwt.sign({users},'Prakhar_Gupta',{
                        expiresIn:60*60
                    });
                    res.cookie('accessToken',token,
                        {
                        httpOnly:true,
                        secure:false,
                        sameSite:'Strict',
                        // maxAge:1000*60*5
                        maxAge:1000*60*60
                    }
                ) 
                  res.status(200).json({users,bool:true,msg:"Login Successfull"});
                }
                else 
                    res.status(200).json({bool:false,msg:"Invalid Credentials"});
            })

        }
        else{
            res.status(200).json({bool:false,msg:"Invalid Credentials"});
        }
    } catch (error) {
        res.status(500).json({ error: error.message, bool:false, msg:"Something went Wrong. Try Again" });
    }
}

const handleLogout = async(req,res)=>{
    try{
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken');
        let {email} = jwt.verify(req.cookies.refreshToken,"Prakhar_Gupta")
        await OnlineUsers.deleteOne({email}); 
        res.status(200).json({bool:true,msg:'logout'})}
        catch(e){

            res.status(200).json({bool:false,msg:'logout failed'})
        }
}
const handleVerifyToken = async(req,res)=>{
    try{
        let {accessToken} = req.cookies
        // console.log(accessToken)
        let {users} = jwt.verify(accessToken,"Prakhar_Gupta")
        res.json({bool:true,users})
    }
    catch(e){
        res.json({bool:false})}
}

module.exports = {
    handleAddUser,
    handleLogin,
    handleGetUser,
    handleGetAllUsers,
    handleLogout,
    handleVerifyToken,
    updateUser
}