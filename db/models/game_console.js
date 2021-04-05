'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game_console = sequelize.define('Game_console', {
    gameId: DataTypes.INTEGER,
    consoleId: DataTypes.INTEGER
  }, {});
  Game_console.associate = function(models) {
    // associations can be defined here
  };
  return Game_console;
};