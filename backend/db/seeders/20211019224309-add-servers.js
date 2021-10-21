'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Servers', [
      {
        ownerId: 1,
        name: "Test Server 1",
      },
      {
        ownerId: 1,
        name: "Test Server 2",
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Servers', null, {});
  }
};
