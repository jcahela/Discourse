'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");

const profilePictures = [
  'https://cdn.discordapp.com/attachments/886336420552269847/903508380314898432/unknown.png',
  'https://cdn.discordapp.com/attachments/886336420552269847/903508381862625320/unknown.png',
  'https://cdn.discordapp.com/attachments/886336420552269847/903508383682932787/unknown.png',
  'https://cdn.discordapp.com/attachments/886336420552269847/903508384517591070/unknown.png',
  'https://cdn.discordapp.com/attachments/886336420552269847/903508385608134686/unknown.png',
  'https://cdn.discordapp.com/attachments/886336420552269847/903508387013230622/unknown.png',
  'https://cdn.discordapp.com/attachments/886336420552269847/903508527425929216/2213426.jpg',
  'https://cdn.discordapp.com/attachments/886336420552269847/903508531020455977/6141028c-ebc6-4182-b0d8-483449f00617.jpg',
  'https://cdn.discordapp.com/attachments/886336420552269847/903508535252492358/1655574325839877_c5_1080x1080.jpeg',
  'https://cdn.discordapp.com/attachments/886336420552269847/903508537798459402/aang-of-avatar-the-last-airbender-wallpaper-2048x1536-6450_26.jpg',
  'https://cdn.discordapp.com/attachments/886336420552269847/903508541472665620/358076.jpg',
  'https://cdn.discordapp.com/attachments/886336420552269847/903508546635825222/1341182.jpg',
  'https://cdn.discordapp.com/attachments/886336420552269847/903508578277687297/cool-profile-pic-matheus-ferrero.jpeg',
  'https://cdn.discordapp.com/attachments/886336420552269847/903508581163335710/Cool-Profile-Picture.jpg',
  'https://cdn.discordapp.com/attachments/886336420552269847/903508583767998464/dccoagk-ee06bdb3-aa27-485c-9181-b57ae1739ce8.png',
  'https://cdn.discordapp.com/attachments/886336420552269847/903508586842427452/aesthetic-anime-profile-pictures-boy-largest-wallpaper-preview.jpg',
  'https://cdn.discordapp.com/attachments/886336420552269847/903508589812019231/Anonymous-FeatPic-600x450.jpg',
  'https://cdn.discordapp.com/attachments/886336420552269847/903508592882225182/Change-Discord-Profile-Picture-780x470.jpg',
  'https://cdn.discordapp.com/attachments/886336420552269847/903508625237106758/ee600b5178e4f1648fd1e8623f049611.jpg',
  'https://cdn.discordapp.com/attachments/886336420552269847/903508628101804092/f1c1985141ae734194fe69fd52dcb4eb.jpg',
  'https://cdn.discordapp.com/attachments/886336420552269847/903508631117525082/f929762526a03a67bd9ea88e93633d84.jpg',
  'https://cdn.discordapp.com/attachments/886336420552269847/903508634481356860/download_1.jpg',
  'https://cdn.discordapp.com/attachments/886336420552269847/903508637270573086/download.jpg',
  'https://cdn.discordapp.com/attachments/886336420552269847/903508640584052757/download.png',
  'https://cdn.discordapp.com/attachments/886336420552269847/903508662079873104/original_1.jpg',
  'https://cdn.discordapp.com/attachments/886336420552269847/903508664273481749/original.jpg',
  'https://cdn.discordapp.com/attachments/886336420552269847/903508666999779358/pexels-photo-771742.jpeg',
  'https://cdn.discordapp.com/attachments/886336420552269847/903508670061633586/photo-1511367461989-f85a21fda167.jpg',
  'https://cdn.discordapp.com/attachments/886336420552269847/903508673039593502/photo-1532074205216-d0e1f4b87368.jpg',
  'https://cdn.discordapp.com/attachments/886336420552269847/903508675858149376/jim-standing-behinds-blinds-smiling-jim-the-office-memes.jpg',

]

function createUsers() {
  const users = []
  for (let i = 0; i < 30; i++) {
    const user = {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      hashedPassword: bcrypt.hashSync('password'),
      profilePicture: profilePictures[i]
    }
    users.push(user);
  };
  return users;
}

const users = createUsers();

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
      ...users
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', null, {});
  }
};
