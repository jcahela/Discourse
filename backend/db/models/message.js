'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsTo(models.Channel, { foreignKey: 'channelId' })
      Message.belongsTo(models.User, { foreignKey: 'userId' })
    }
    static async bulkCreate(messages) {
      for (let i = 0; i < messages.length; i++) {
        const message = messages[i];
        await Message.create(message);
      }
    }
  };
  Message.init({
    userId: DataTypes.INTEGER,
    channelId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};
