const express = require("express");
const asyncHandler = require("express-async-handler");
const { Message, User } = require("../../db/models");

const router = express.Router();

module.exports = router;

router.get('/', asyncHandler(async (req, res) => {
    const messages = await Message.findAll({ include: User });
    return res.json(messages);
}))