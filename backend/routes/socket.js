const { Message, User, PendingRequest, Friendship } = require('../db/models')
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
    const user = await User.findByPk(userId, {
        include: ["Friends1", "Friends2", "Requests"]
    });
    await user.update({
        onlineStatus: false
    })
    return user
}

const addFriendRequest = async (senderId, receiverId) => {
    await PendingRequest.create({
        sender: senderId,
        receiver: receiverId
    });
    const requestRecipient = await User.findByPk(receiverId, {
        include: ["Friends1", "Friends2", 'Requests']
    });
    return requestRecipient
}

const cancelFriendRequest = async (senderId, receiverId) => {
    const requestToRemove = await PendingRequest.findOne({
        where: {
            sender: senderId,
            receiver: receiverId
        }
    });
    await requestToRemove.destroy();
    const requestRecipient = await User.findByPk(receiverId, {
        include: ["Friends1", "Friends2", "Requests"]
    });
    return requestRecipient
}

const acceptFriendRequest = async (senderId, receiverId) => {
    const friendRequest1 = await PendingRequest.findOne({
        where: {
            sender: senderId,
            receiver: receiverId
        }
    });

    const friendRequest2 = await PendingRequest.findOne({
        where: {
            sender: receiverId,
            receiver: senderId
        }
    });

    // remove the pending request from the requests table
    console.log('start')
    if (friendRequest1) await friendRequest1.destroy();
    if (friendRequest2) await friendRequest2.destroy();
    console.log('end')
    // where: {
    //     [Op.or]: [{username: credential}, {email: credential}]
    // },
    // check if they are already friends
    const friendshipExists = await Friendship.findOne({
        where: {
            [Op.or]: [
                {
                    user1: senderId,
                    user2: receiverId
                },
                {
                    user1: receiverId,
                    user2: senderId
                }
            ]
        }
    })

    // add the users as friends if they are not already friends
    if (!friendshipExists) {
        await Friendship.create({
            user1: senderId,
            user2: receiverId
        });
    }
    
    const user1 = await User.findByPk(senderId, {
        include: ["Friends1", "Friends2", "Requests"]
    });

    const user2 = await User.findByPk(receiverId, {
        include: ["Friends1", "Friends2", "Requests"]
    });

    return {
        user1,
        user2
    }
}

const declineFriendRequest = async (senderId, receiverId) => {
    const requestToDecline = await PendingRequest.findOne({
        where: {
            sender: senderId,
            receiver: receiverId
        }
    });

    await requestToDecline.destroy();

    const user1 = await User.findByPk(senderId, {
        include: ["Friends1", "Friends2", "Requests"]
    });

    const user2 = await User.findByPk(receiverId, {
        include: ["Friends1", "Friends2", "Requests"]
    });

    return {
        user1,
        user2
    }
}

module.exports = {
    storeMessage, 
    editMessage,
    deleteMessage,
    setOnlineStatus,
    setOfflineStatus,
    addFriendRequest,
    cancelFriendRequest,
    acceptFriendRequest,
    declineFriendRequest
};
