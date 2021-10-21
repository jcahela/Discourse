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
