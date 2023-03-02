const config = require('./index');
const Sequelize = require('sequelize');

console.log(process.env.NODE_ENV);

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: config.environment === 'development' ? 'localhost' : 'dpg-cfvse3t269v0ptnouacg-a',
  dialect: 'postgres',
  dialectOptions: {
    ssl: config.environment === 'development' ? false : true, // Required for connecting to Render's managed PostgreSQL service
  },
});

module.exports = sequelize;
