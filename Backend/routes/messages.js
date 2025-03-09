const express = require("express");
const { createConversation, sendMessage, getMessages, getConversations } = require("../controllers/messaging");
const router = express.Router();

router.post("/createConversation",createConversation);
router.post("/sendMessage",sendMessage);
router.post("/getMessages",getMessages);
router.post("/getConversations",getConversations)

module.exports = router