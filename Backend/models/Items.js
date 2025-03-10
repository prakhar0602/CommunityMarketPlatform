const mongoose = require("mongoose");

const ItemsSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    category: { type: String, enum:["Electronics","Clothing","Furniture","Vehicle","Accessories","Healthcare","Cleaning","Others"],default:"others" },
    description: { type: String },
    price: { type: Number },
    status: { type: String, enum: ["sale","trade","donation","sold"], default: "sale" },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "Users",required:true },
    condition: { type:Number , min:1, max:5 },
    Images:[
        {
            type:String,
            trim:true
        }
    ],
    buyer:{type:mongoose.Schema.Types.ObjectId,ref:"Users"}
}, { timestamps: true });

const Items = mongoose.model("Items", ItemsSchema);
module.exports = Items;