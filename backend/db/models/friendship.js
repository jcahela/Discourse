'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friendship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static async bulkCreate(friendships) {
      for (let i = 0; i < friendships.length; i++) {
        const friendship = friendships[i];
        await Friendship.create(friendship);
      }
    }
  };
  Friendship.init({
    user1: DataTypes.INTEGER,
    user2: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Friendship',
  });
  return Friendship;
};
