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