'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Servers', [
      {
        ownerId: 1,
        name: "Test Server 1",
        serverPicture: "https://cdn.discordapp.com/attachments/886336420552269847/900130882671751250/default_user_picture.png"
      },
      {
        ownerId: 1,
        name: "Test Server 2",
        serverPicture: "https://cdn.discordapp.com/attachments/886336420552269847/900130882671751250/default_user_picture.png"
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Servers', null, {});
  }
};
