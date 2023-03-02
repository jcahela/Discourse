const config = require('./index');
const Sequelize = require('sequelize');

console.log(process.env.DATABASE_URL);

const sequelize = new Sequelize(process.env.DATABASE_URL || config.db.url, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: config.environment === 'development' ? false : true, // Required for connecting to Render's managed PostgreSQL service
  },
});

module.exports = sequelize;
