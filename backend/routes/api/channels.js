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

const validateEditChannels = [
    check('name')
        .isLength({ max: 25 })
        .withMessage('Channel name can\'t be more than 25 characters'),
    check('name')
        .exists({ checkFalsy:true })
        .withMessage('You must enter a channel name'),
    check('topic')
        .isLength({max: 255})
        .withMessage('Topic can\'t be more than 255 characters'),
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

router.patch(
    '/:id(\\d+)',
    validateEditChannels,
    asyncHandler(async (req, res) => {
        const channelId = req.params.id;
        const { name } = req.body;
        let { topic } = req.body;

        if (topic.replace(/\s/g, '').length === 0) {
            topic = null;
        }

        const channelToUpdate = await Channel.findOne({ where: {id: channelId} });

        await channelToUpdate.update({
            name,
            topic: topic || null
        });

        res.json(channelToUpdate);
    })
);

router.delete('/:id(\\d+)', asyncHandler( async(req, res) => {
    const channelId = req.params.id;
    const channelToDelete = await Channel.findOne({ where: {id: channelId} });
    await channelToDelete.destroy();
    res.json(channelToDelete.id)
}))

module.exports = router;
