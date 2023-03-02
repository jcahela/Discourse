const config = require('./index');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: config.environment === 'development' ? 'localhost' : 'dpg-cfvse3t269v0ptnouacg-a',
  dialect: 'postgres',
  dialectOptions: {
    ssl: { rejectUnauthorized: false }, // Required for connecting to Render's managed PostgreSQL service
  },
});

module.exports = sequelize;
