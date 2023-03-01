const sequelize = require("../config/sequelize.js");
const { User } = require("../db/models");
const bcrypt = require("bcryptjs");

async function main() {
  // Sync all models to the database
  await sequelize.sync({ force: true });

  console.log('User model', User);

  // Seed the database with initial data
  await User.bulkCreate([
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
  ]);
}

main()
  .then(() => console.log('Migration and seeding complete!'))
  .catch(console.error);
