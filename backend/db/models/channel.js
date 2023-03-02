'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Channel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Channel.belongsTo(models.Server, { foreignKey: 'serverId' })
      Channel.hasMany(models.Message, { foreignKey: 'channelId' })
    }
    static async bulkCreate(channels) {
      const createdChannels = [];
      for (let i = 0; i < channels.length; i++) {
        const channel = channels[i];
        const createdChannel = await Channel.create(channel);
        createdChannels.push(createdChannel);
      }
      return createdChannels
    }
  };
  Channel.init({
    serverId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    topic: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Channel',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return Channel;
};
