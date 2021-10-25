const { Message } = require('../db/models')

const storeMessage = async (message) => {
    const { userId, channelId, content } = message;
    await Message.create({
        userId,
        channelId,
        content
    })
}

module.exports = storeMessage;
