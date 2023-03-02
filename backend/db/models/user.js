'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, username, email, profilePicture } = this; // context will be the User instance
      return { id, username, email, profilePicture };
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential,
          },
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.findByPk(user.id, {include: ['Friends1', 'Friends2', 'Requests']});
      }
    }
    static async signup({ username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword,
      });
      const signedUpUser = await User.findByPk(user.id, {include: ["Friends1", "Friends2", 'Requests']})
      return signedUpUser;
    };
    static associate(models) {
      // define association here
      User.hasMany(models.Server, { foreignKey: 'ownerId' })
      User.hasMany(models.Message, { foreignKey: 'userId' })

      const columnMapping1 = {
        as: 'Friends1',
        through: 'Friendship',
        otherKey: 'user2',
        foreignKey: 'user1'
      }
  
      const columnMapping2 = {
        as: 'Friends2',
        through: 'Friendship',
        otherKey: 'user1',
        foreignKey: 'user2'
      }

      const columnMapping3 = {
        as: 'Requests',
        through: 'PendingRequests',
        otherKey: 'sender',
        foreignKey: 'receiver'
      }
  
      User.belongsToMany(models.User, columnMapping1);
      User.belongsToMany(models.User, columnMapping2);
      User.belongsToMany(models.User, columnMapping3);
    }
    static async bulkCreate(users) {
      const createdUsers = [];
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const createdUser = await User.create(user);
        createdUsers.push(createdUser);
      }
      return createdUsers;
    }
  };
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
        },
      },
      profilePicture: {
        type: DataTypes.STRING,
      },
      onlineStatus: {
        type: DataTypes.BOOLEAN,
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );
  return User;
};
