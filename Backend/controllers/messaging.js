const Conversations = require("../models/Conversations");
const Users = require("../models/Users");

const createConversation = async(req,res)=>{
    try{
        const {email,id} = req.body;
        let sender = await Users.findById(id);
        let reciever = await Users.findOne({email});
        console.log(sender)
        console.log(email)
        console.log(reciever)
        let conversation = await Conversations.create({User1:sender,User2:reciever,messages:[]});
        sender.conversations.push(conversation);
        reciever.conversations.push(conversation);
        await sender.save();
        await reciever.save();
        res.status(200).json({bool:true})
    }catch(e){  
        console.log(e.message)
        res.status(200).json({bool:false})
    }
}

const sendMessage = async(req,res)=>{ 
    try{
        let {conversationId,sender,receiver,content} = req.body;
        let conversation = await Conversations.findById(conversationId);
        let message = await Message.create({sender,receiver,content});
        conversation.messages.push(message);
        await conversation.save();
        res.status(201).json({bool:true,msg:"Message Sent"});
    }catch(e){
        res.status(200).json({bool:false,msg:"Message Sent Failed"});

    }
}

const getMessages = async(req,res)=>{
    try{
        let {conversationId} = req.body;
        let conversation = await Conversations.findById(conversationId).populate("messages");
        let messages = conversation.messages;
        res.status(200).json({bool:true,messages});
    }catch(e){
        res.status(200).json({bool:false})
    }
}

const getConversations = async(req,res) =>{
    try{
        let {id} = req.body;
        let user = await User.findById(id).populate({ path: "conversations", populate: { path: "user1 user2"}});
        let conversations = user.conversations
        res.status(200).json({bool:true,conversations});
    }
    catch(e){
        res.status(200).json({bool:false});
    }
}

module.exports = {createConversation,sendMessage,getMessages,getConversations};