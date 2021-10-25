const express = require("express");
const asyncHandler = require("express-async-handler");
const { Message } = require("../../db/models");

const router = express.Router();

module.exports = router;

router.get('/', asyncHandler(async (req, res) => {
    const messages = await Message.findAll();
    return res.json(messages);
}))
