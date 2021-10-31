'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Servers', [
      {
        ownerId: 1,
        name: "Attack on Titan Fans",
        serverPicture: "https://cdn.discordapp.com/attachments/886336420552269847/904401248051138630/Eren-Jaeger-from-Attack-on-Titan-with-his-long-hair-in-a-bun.jpg"
      },
      {
        ownerId: 1,
        name: "Cool cats",
        serverPicture: "https://cdn.discordapp.com/attachments/886336420552269847/904401336563535932/istockphoto-1281804798-170667a.jpg"
      },
      {
        ownerId: 1,
        name: "June Cohort",
      },
      {
        ownerId: 1,
        name: "The Last Airbender",
        serverPicture: "https://cdn.discordapp.com/attachments/886336420552269847/903508537798459402/aang-of-avatar-the-last-airbender-wallpaper-2048x1536-6450_26.jpg"
      },
      {
        ownerId: 1,
        name: "Jason's Awesome Server",
      },
      {
        ownerId: 1,
        name: "cool gifs",
        serverPicture: "https://cdn.discordapp.com/attachments/886336420552269847/904402317313441862/200.png"
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Servers', null, {});
  }
};
