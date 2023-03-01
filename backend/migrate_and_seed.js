/* <PROJECT_ROOT>/migrations.js */
var Umzug = require("umzug");
var models = require("./db/models");

var migrationsConfig = {
  storage: "sequelize",
  storageOptions: {
    sequelize: models.sequelize
    // modelName: 'SequelizeMeta' // No need to specify, because this is default behaviour
  },
  migrations: {
    params: [
      models.sequelize.getQueryInterface(),
      models.sequelize.constructor
    ],
    path: "./db/migrations", // path to folder containing migrations
    pattern: /\.js$/
  }
};

var seedsConfig = {
  storage: "sequelize",
  storageOptions: {
    sequelize: models.sequelize,
    modelName: 'SequelizeData' // Or whatever you want to name the seeder storage table
  },
  migrations: {
    params: [
      models.sequelize.getQueryInterface(),
      models.sequelize.constructor
    ],
    path: "./db/seeders", // path to folder containing seeds
    pattern: /\.js$/
  }
};

var migrator = new Umzug(migrationsConfig);
var seeder = new Umzug(seedsConfig);

module.exports = () => migrator.up().then(() => seeder.up());

/* <PROJECT_ROOT>/index.js */
var migrations = require("./migrations");

// Run migrations & seeds
migrations().then(function() {
  console.log("Migrations completed");
});
