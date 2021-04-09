"use strict";
module.exports = (sequelize, DataTypes) => {
  const Console = sequelize.define(
    "Console",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  Console.associate = function (models) {
    Console.belongsToMany(models.Game, {
      through: "Game_console",
      as: "game_consoles",
      otherKey: "gameId",
      foreignKey: "consoleId",
    });

    Console.belongsToMany(models.User, {
      through: "User_console",
      as: "user_consoles",
      otherKey: "userId",
      foreignKey: "consoleId",
    });
  };
  return Console;
};
