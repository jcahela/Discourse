const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { handleValidationErrors } = require("../../utils/validation")
const { requireAuth } = require("../../utils/auth")
const { Channel } = require("../../db/models");

const router = express.Router();

const validateNewChannels = [
    check('name')
        .isLength({ max: 25 })
        .withMessage('Channel name can\'t be more than 25 characters'),
    handleValidationErrors,
]

router.get('/', requireAuth, asyncHandler(async (req, res) => {
    const channels = await Channel.findAll();
    return res.json(channels);
}));

router.post('/', validateNewChannels, requireAuth, asyncHandler(async (req, res) => {
    const { name, serverId } = req.body;
    const newChannel = await Channel.create({
        serverId,
        name
    });
    return res.json(newChannel)
}))

module.exports = router;
