const path = require('path');
const Umzug = require('umzug');
const sequelize = require("../config/sequelize.js");

const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: {
    sequelize: sequelize
  },
  migrations: {
    path: path.join(__dirname, '../db/migrations'),
    params: [
      sequelize.getQueryInterface(),
      sequelize.constructor
    ],
    pattern: /\.js$/
  }
});

async function migrate() {
  await umzug.up();
  console.log('All migrations have been executed');
}

migrate();
