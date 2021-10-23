'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Channels', [
      {
        serverId: 1,
        name: "Test Channel 1",
      },
      {
        serverId: 2,
        name: "Test Channel 2",
        topic: "This is a channel for testing topics and logic for disabling the button based on there being actual text for the channel's topic"
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Channels', null, {});
  }
};
