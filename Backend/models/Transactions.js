const mongoose = require("mongoose");
const transactionSchema = mongoose.Schema({
    itemSold:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Items"
    },
    soldBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    },
    soldTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    }
});

const Transactions = mongoose.model("Transactions",transactionSchema);
module.exports = Transactions;