const express = require("express");
const { addItem, filterItem, getItems, getItem, getUserItem, buyItem } = require("../controllers/item");
const router = express.Router();

router.post("/addItem",addItem);
router.get("/filter",filterItem);
router.get("/getAllItems",getItems);
router.get("/getItem/:id",getItem);
router.get("/getUserItem/:id",getUserItem);
router.post("/buy",buyItem);

module.exports = router