const sequelize = require("../config/sequelize.js");
const { User, Friendship, PendingRequest, Server, Channel, Message } = require("../db/models");
const bcrypt = require("bcryptjs");
const faker = require("faker");

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
  'https://cdn.discordapp.com/attachments/886336420552269847/903508675858149376/jim-standing-behinds-blinds-smiling-jim-the-office-memes.jpg'
]

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function createUsers() {
  const users = []
  for (let i = 0; i < 30; i++) {

    const onlineStatusChoices = [true, false]

    const randomStatusIndex = getRandomInt(0, 2);

    const user = {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      hashedPassword: bcrypt.hashSync('password'),
      profilePicture: profilePictures[i],
      onlineStatus: onlineStatusChoices[randomStatusIndex]
    }
    users.push(user);
  };
  return users;
}

const users = createUsers();

// Seed the database with initial data
async function main() {
  // Sync all models to the database
  await sequelize.sync({ force: true });

  // Create Users
  const createdUsers = await User.bulkCreate([
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
  ]);

  const demoLition = createdUsers[0];
  const demoCat = createdUsers[1];

  // Create Friendships <3
  await Friendship.bulkCreate([
    { user1: demoLition.id, user2: createdUsers[getRandomInt(2, createdUsers.length - 1)].id },
    { user1: demoLition.id, user2: createdUsers[getRandomInt(2, createdUsers.length - 1)].id },
    { user1: demoLition.id, user2: createdUsers[getRandomInt(2, createdUsers.length - 1)].id },
    { user1: demoLition.id, user2: createdUsers[getRandomInt(2, createdUsers.length - 1)].id },
    { user1: demoLition.id, user2: createdUsers[getRandomInt(2, createdUsers.length - 1)].id },
    { user1: demoCat.id, user2: createdUsers[getRandomInt(2, createdUsers.length - 1)].id },
    { user1: demoCat.id, user2: createdUsers[getRandomInt(2, createdUsers.length - 1)].id },
    { user1: demoCat.id, user2: createdUsers[getRandomInt(2, createdUsers.length - 1)].id },
    { user1: demoCat.id, user2: createdUsers[getRandomInt(2, createdUsers.length - 1)].id },
  ]);

  // Create Pending Friend Requests
  await PendingRequest.bulkCreate([
    { sender: createdUsers[getRandomInt(2, createdUsers.length - 1)].id, receiver: demoLition.id },
    { sender: createdUsers[getRandomInt(2, createdUsers.length - 1)].id, receiver: demoLition.id },
    { sender: createdUsers[getRandomInt(2, createdUsers.length - 1)].id, receiver: demoLition.id },
    { sender: createdUsers[getRandomInt(2, createdUsers.length - 1)].id, receiver: demoCat.id },
    { sender: createdUsers[getRandomInt(2, createdUsers.length - 1)].id, receiver: demoCat.id },
    { sender: createdUsers[getRandomInt(2, createdUsers.length - 1)].id, receiver: demoCat.id },
  ]);

  // Create Servers
  const servers = await Server.bulkCreate([
    {
      ownerId: demoCat.id,
      name: "Attack on Titan Fans",
      serverPicture: "https://cdn.discordapp.com/attachments/886336420552269847/904401248051138630/Eren-Jaeger-from-Attack-on-Titan-with-his-long-hair-in-a-bun.jpg"
    },
    {
      ownerId: demoCat.id,
      name: "Cool cats",
      serverPicture: "https://cdn.discordapp.com/attachments/886336420552269847/904401336563535932/istockphoto-1281804798-170667a.jpg"
    },
    {
      ownerId: demoCat.id,
      name: "June Cohort",
    },
    {
      ownerId: demoLition.id,
      name: "The Last Airbender",
      serverPicture: "https://cdn.discordapp.com/attachments/886336420552269847/903508537798459402/aang-of-avatar-the-last-airbender-wallpaper-2048x1536-6450_26.jpg"
    },
    {
      ownerId: demoLition.id,
      name: "Jason's Awesome Server",
    },
    {
      ownerId: demoLition.id,
      name: "cool gifs",
      serverPicture: "https://cdn.discordapp.com/attachments/886336420552269847/904402317313441862/200.png"
    },
  ]);

  // Create Channels
  const channels = await Channel.bulkCreate([
    {
      serverId: servers[0].id,
      name: "general",
    },
    {
      serverId: servers[1].id,
      name: "lounge"
    },
    {
      serverId: servers[2].id,
      name: "lounge"
    },
    {
      serverId: servers[3].id,
      name: "general"
    },
    {
      serverId: servers[4].id,
      name: "general"
    },
    {
      serverId: servers[5].id,
      name: "general"
    },
    {
      serverId: servers[0].id,
      name: "notes-resources",
    },
    {
      serverId: servers[1].id,
      name: "memes",
      topic: "Share the dank memes here!"
    },
    {
      serverId: servers[2].id,
      name: "rl-crew",
      topic: "People who know each other IRL"
    },
    {
      serverId: servers[3].id,
      name: "mmo",
      topic: "World of Warcraft or any other MMOs you like"
    },
    {
      serverId: servers[4].id,
      name: "chess",
      topic: "The game of kings"
    },
    {
      serverId: servers[5].id,
      name: "welcome",
      topic: "Welcome new members here!"
    },
    {
      serverId: servers[0].id,
      name: "gamerz",
    },
    {
      serverId: servers[0].id,
      name: "arts and crafts",
      topic: "Got any creative talents? Share em here please!"
    },
    {
      serverId: servers[1].id,
      name: "off-topic"
    },
    {
      serverId: servers[3].id,
      name: "wows-only",
      topic: "Wow. wow! wow. wow wow, wow--wow."
    },
    {
      serverId: servers[5].id,
      name: "flash card collection"
    },
    {
      serverId: servers[5].id,
      name: "positive affirmations",
      topic: "You're great and you will be okay."
    },
  ]);

  // Create Messages
  function createMessages() {
    const messagesArr = [];
    for (let i = 0; i < 500; i++) {
      const userId = createdUsers[getRandomInt(0, createdUsers.length - 1)].id;
      const channelId = channels[getRandomInt(0, channels.length - 1)].id;
      const randomDateTime = faker.date.between('2023-01-01', '2023-03-02')
      const numConsecutiveMessages = getRandomInt(1, 6);
      for (let j = 0; j < numConsecutiveMessages; j++) {
        const messageWordCount = getRandomInt(1, 20);
        messagesArr.push({
          userId: userId,
          channelId: channelId,
          content: faker.random.words(messageWordCount),
          createdAt: randomDateTime,
          updatedAt: randomDateTime
        })
      }
    }
    return messagesArr;
  }
  
  const messages = createMessages();

  await Message.bulkCreate([ ...messages ]);

}

main()
  .then(() => console.log('Migration and seeding complete!'))
  .catch(console.error);
