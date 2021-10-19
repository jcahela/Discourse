'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Messages', [
      {
        userId: 1,
        channelId: 1,
        content: "Test message 1"
      },
      {
        userId: 1,
        channelId: 2,
        content: "Test message 1, owned by Channel 2, which is owned by Server 2"
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Messages', null, {});
  }
};
