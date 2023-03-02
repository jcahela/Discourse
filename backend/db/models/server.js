'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Server extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Server.belongsTo(models.User, { foreignKey: 'ownerId' })
      Server.hasMany(models.Channel, { foreignKey: 'serverId' })
    }
    static async bulkCreate(servers) {
      const createdServers = [];
      for (let i = 0; i < servers.length; i++) {
        const server = servers[i];
        const createdServer = await Server.create(server);
        createdServers.push(createdServer);
      }
      return createdServers
    }
  };
  Server.init({
    ownerId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    serverPicture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Server',
  });
  return Server;
};
