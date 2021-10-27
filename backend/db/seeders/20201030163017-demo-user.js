'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicture: "https://cdn.discordapp.com/attachments/886336420552269847/900599477092630538/Cool-Profile-Picture-For-Discord.jpg"
      },
      {
        email: 'demo2@user.io',
        username: 'Demo-cat',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicture: "https://cdn.discordapp.com/attachments/886336420552269847/902952928057385070/istockphoto-1281804798-170667a.jpg"
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', null, {});
  }
};
