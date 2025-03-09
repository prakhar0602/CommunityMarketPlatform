const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    review:{
        type:String,
        required:true,
        trim:true
    },
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  })

const Reviews = mongoose.model("Reviews",reviewSchema);
module.exports = Reviews