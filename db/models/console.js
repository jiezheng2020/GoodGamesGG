'use strict';
module.exports = (sequelize, DataTypes) => {
  const Console = sequelize.define('Console', {
    name: DataTypes.STRING
  }, {});
  Console.associate = function(models) {
    Console.belongsToMany(models.Game, {
      through: 'Game_console',
      otherKey: 'gameId',
      foreignKey: 'consoleId'
    });

    Console.belongsToMany(models.User, {
      through: 'User_console',
      otherKey: 'userId',
      foreignKey: 'consoleId'
    });

  };
  return Console;
};
