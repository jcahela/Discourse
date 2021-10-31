'use strict';
const faker = require("faker");

// Channels: 18
// Users: 30
// Messages in a row: 1-5

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomChannel() {
  return getRandomInt(1, 19);
}

function getRandomUser() {
  return getRandomInt(1, 31);
}

function getRandomConsecutiveMessageCount() {
  return getRandomInt(1, 6);
}

function getRandomWordCount() {
  return getRandomInt(1, 20)
}

function createMessages() {
  const messagesArr = [];
  for (let i = 0; i < 1000; i++) {
    const userId = getRandomUser();
    const channelId = getRandomChannel();
    for (let j = 0; j < getRandomConsecutiveMessageCount(); j++) {
      messagesArr.push({
        userId: userId,
        channelId: channelId,
        content: faker.random.words(getRandomWordCount())
      })
    }
  }
  return messagesArr;
}

const messages = createMessages();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Messages', [
      ...messages
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Messages', null, {});
  }
};
