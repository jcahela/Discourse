const { Message } = require('../db/models')

const storeMessage = async (message) => {
    const { userId, channelId, content } = message;
    const newMessage = await Message.create({
        userId,
        channelId,
        content
    })
    return newMessage
}

module.exports = storeMessage;
