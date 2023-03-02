'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PendingRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static async bulkCreate(pendingRequests) {
      for (let i = 0; i < pendingRequests.length; i++) {
        const pendingRequest = pendingRequests[i];
        await PendingRequest.create(pendingRequest);
      }
    }
  };
  PendingRequest.init({
    sender: DataTypes.INTEGER,
    receiver: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PendingRequest',
  });
  return PendingRequest;
};
