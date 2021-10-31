'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Channels', [
      {
        serverId: 1,
        name: "general",
      },
      {
        serverId: 2,
        name: "lounge"
      },
      {
        serverId: 3,
        name: "lounge"
      },
      {
        serverId: 4,
        name: "general"
      },
      {
        serverId: 5,
        name: "general"
      },
      {
        serverId: 6,
        name: "general"
      },
      {
        serverId: 1,
        name: "notes-resources",
      },
      {
        serverId: 2,
        name: "memes",
        topic: "Share the dank memes here!"
      },
      {
        serverId: 3,
        name: "rl-crew",
        topic: "People who know each other IRL"
      },
      {
        serverId: 4,
        name: "mmo",
        topic: "World of Warcraft or any other MMOs you like"
      },
      {
        serverId: 5,
        name: "amogus",
        topic: "Among Us anyone?"
      },
      {
        serverId: 6,
        name: "welcome",
        topic: "Welcome new members here!"
      },
      {
        serverId: 1,
        name: "gamerz",
      },
      {
        serverId: 1,
        name: "arts and crafts",
        topic: "Got any creative talents? Share em here please!"
      },
      {
        serverId: 2,
        name: "off-topic"
      },
      {
        serverId: 4,
        name: "wows-only",
        topic: "Wow. wow! wow. wow wow, wow--wow."
      },
      {
        serverId: 6,
        name: "flash card collection"
      },
      {
        serverId: 6,
        name: "positive affirmations",
        topic: "You're great and you will be okay."
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Channels', null, {});
  }
};
