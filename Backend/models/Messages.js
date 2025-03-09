const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const Messages = mongoose.model("Messages", MessageSchema);
module.exports = Messages