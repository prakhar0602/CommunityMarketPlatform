const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    profile_picture:{
        type:String,
        trim:true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    reputation: {
      type: Number,
      default: 0,
    },
    reviews:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Reviews"
    }],
    transactionHistory:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Transactions"
      }
    ],
    myItems:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Items"
    }],
    conversations:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Conversations"
    }],
  },
  { timestamps: true }
);

const Users = mongoose.model("Users",UserSchema);
module.exports = Users;