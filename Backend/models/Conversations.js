const mongoose = require("mongoose");
const ConversationSchema = new mongoose.Schema({
    User1: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    User2: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref:"Messages" }],
    timestamp: { type: Date, default: Date.now },
});

const Conversations = mongoose.model("Conversations", ConversationSchema);
module.exports = Conversations