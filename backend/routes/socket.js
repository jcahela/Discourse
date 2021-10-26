const { Message, User } = require('../db/models')

const storeMessage = async (message) => {
    const { userId, channelId, content } = message;
    const newMessage = await Message.create({
        userId,
        channelId,
        content
    })
    const createdMessage = await Message.findOne({ where: { id: newMessage.id }, include: User})
    return createdMessage
}

const editMessage = async (message) => {
    const {id, content} = message;
    const messageToEdit = await Message.findOne({ where: {id} , include: User });
    messageToEdit.update({ content });
    return messageToEdit
}

const deleteMessage = async (messageId) => {
    const messageToDelete = await Message.findByPk(messageId);
    console.log('THIS IS THE MESSAGE I WANT TO DELETE', messageToDelete)
    await messageToDelete.destroy();
    return messageId;
}

module.exports = {
    storeMessage, 
    editMessage,
    deleteMessage
};
