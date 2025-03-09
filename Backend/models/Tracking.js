const mongoose = require("mongoose");

const TrackingSchema = new mongoose.Schema({
    itemUsedNo:{
        type:Number,
        required:true
    },
    itemsReused:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true
        }
    ],
    CO2_savings:{
        type:Number,
        required:true,
        default:0,
    },
    landFillWasteReduced:{
        type:Number,
        required:true
    }
});

const Tracking = mongoose.model("Tracking", TrackingSchema);
module.exports = Tracking;