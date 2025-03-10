const Items = require("../models/Items");
const Transactions = require("../models/Transactions");
const Users = require("../models/Users");

const addItem = async(req,res)=>{
    try{
        let { itemName,category,description,price,status,condition,images,id}=req.body;
        let user = await Users.findById(id);
        let item = await Items.create({itemName,category,description,price,status,seller:id,condition,Images:images});
        user.myItems.push(item);
        await user.save();
        res.status(201).json({bool:true, msg:"Item Registered"});

    }
    catch(error){
        console.log(error.message);
        res.status(200).json({bool:false,msg:"Item Registeration Failed"});
    }
}

const getItem = async(req,res)=>{
    try{

        const {id} = req.params;
        // console.log(id)
        let item = await Items.findById(id).populate("seller");
        res.status(200).json({bool:true,item});
    }catch(e){
        console.log(e.message)
        res.status(200).json({bool:false});
    }
}

const getUserItem = async(req,res)=>{
    try{
        const {id} = req.params;
        let user = await Users.findById(id).populate("myItems");
        res.status(200).json({bool:true,items:user.myItems});
    }catch(e){
        res.status(200).json({bool:false});
    }
}

const filterItem = async(req,res)=>{
    try{
        let {priceMin,priceMax,location,condition,category,status} = req.query;
        let items = await Items.find().populate("seller");
        if(condition!="" )
            items = items.filter((x)=>condition==x.condition);
        if(location!="")
            items = items.filter((x)=>location==x.seller.location);
        if(category!="")
            items = items.filter((x)=>category==x.category);
        if(status!="")
            items = items.filter((x)=>status==x.status);
        if(priceMin!="")
            items = items.filter((x)=>x.price>=priceMin);
        if(priceMax!="")
            items = items.filter((x)=>x.price<=priceMax);
        res.status(200).json({bool:true,items})
    }
    catch(error){
        console.log(error.message);
        res.status(200).json({bool:false,msg:"Invalid Filter"})
    }
}


const getItems = async(req,res)=>{
    try{
        let items = await Items.find();
        res.status(200).json({bool:true,items});
    }catch(e){
        console.log(e.message);
        res.status(200).json({bool:false});
    }
}

const buyItem = async(req,res) => {
    try{
        let {seller , buyer, item} = req.body;
        const transaction = await Transactions.create({soldBy:seller,soldTo:buyer,itemSold:item});
        seller = await Users.findById(seller)
        buyer = await Users.findById(buyer)
        seller.transactionHistory.push(transaction);
        buyer.transactionHistory.push(transaction);
        await seller.save();
        await buyer.save();
        item = await Items.findById(item);
        item.status = "sold";
        item.buyer = buyer;
        await item.save();
        res.status(200).json({bool:true,msg:"Transaction Complete"});
    }catch(e){
        console.log(e.message)
        res.status(200).json({bool:false,msg:"Transaction Failed"});
    }
}

module.exports = {addItem,filterItem,getItems,getItem,getUserItem,buyItem};