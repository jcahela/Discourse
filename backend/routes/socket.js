const { Message, User } = require('../db/models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
    await messageToDelete.destroy();
    return messageId;
}

const setOnlineStatus = async (credential) => {
    const user = await User.findOne({
        where: {
            [Op.or]: [{username: credential}, {email: credential}]
        },
        include: ["Friends1", "Friends2", 'Requests']
    });
    await user.update({
        onlineStatus: true
    })
    return user;
}

const setOfflineStatus = async (userId) => {
    const user = await User.findByPk(userId);
    await user.update({
        onlineStatus: false
    })
    return user
}

module.exports = {
    storeMessage, 
    editMessage,
    deleteMessage,
    setOnlineStatus,
    setOfflineStatus
};
