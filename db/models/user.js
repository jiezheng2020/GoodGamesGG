"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "First Name must not be null.",
          },
          notEmpty: {
            msg: "Please provide a First Name.",
          },
          len: {
            args: [1, 50],
            msg: "First Name cannot be longer than 50 characters long.",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Last Name must not be null.",
          },
          notEmpty: {
            msg: "Please provide a Last Name.",
          },
          len: {
            args: [1, 50],
            msg: "Last Name cannot be longer than 50 characters long.",
          },
        },
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Username must not be null.",
          },
          notEmpty: {
            msg: "Please provide a Username.",
          },
          len: {
            args: [1, 30],
            msg: "Username cannot be longer than 30 characters long.",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Email must not be null.",
          },
          notEmpty: {
            msg: "Please provide an Email.",
          },
          isEmail: {
            msg: "Please provide a valid email.",
          },
          len: {
            args: [1, 50],
            msg: "Email cannot be longer than 60 characters long.",
          },
        },
      },
      hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Pasword cannot be null.",
          },
          notEmpty: {
            msg: "Please provide a valid password.",
          },
        },
      },
    },
    {}
  );
  User.associate = function (models) {
    User.belongsToMany(models.Game, {
      through: "Rating",
      as: "user_ratings",
      otherKey: "gameId",
      foreignKey: "userId",
    });

    User.belongsToMany(models.Game, {
      through: "My_game",
      as: "user_mygames",
      otherKey: "gameId",
      foreignKey: "userId",
    });

    User.hasMany(models.Library, { foreignKey: "userId" });

    User.belongsToMany(models.Console, {
      through: "User_console",
      as: "user_consoles",
      otherKey: "consoleId",
      foreignKey: "userId",
    });
  };
  return User;
};
