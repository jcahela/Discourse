'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Friendships', [
      {
        user1: 1,
        user2: 2
      },
      {
        user1: 1,
        user2: 3
      },
      {
        user1: 1,
        user2: 4
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Friendships', null, {});
  }
};
