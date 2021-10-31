'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Friendships', [
      {
        user1: 1,
        user2: 4
      },
      {
        user1: 1,
        user2: 5
      },
      {
        user1: 1,
        user2: 6
      },
      {
        user1: 1,
        user2: 7
      },
      {
        user1: 1,
        user2: 8
      },
      {
        user1: 2,
        user2: 7
      },
      {
        user1: 2,
        user2: 8
      },
      {
        user1: 2,
        user2: 9
      },
      {
        user1: 2,
        user2: 10
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Friendships', null, {});
  }
};
