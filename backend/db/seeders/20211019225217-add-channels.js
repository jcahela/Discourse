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
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Channels', null, {});
  }
};
