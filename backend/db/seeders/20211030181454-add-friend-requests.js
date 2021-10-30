'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('PendingRequests', [
      {
        sender: 14,
        receiver: 1
      },
      {
        sender: 25,
        receiver: 1
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('PendingRequests', null, {});
  }
};
