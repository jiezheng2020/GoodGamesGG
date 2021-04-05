'use strict';
module.exports = (sequelize, DataTypes) => {
  const My_game = sequelize.define('My_game', {
    played: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER
  }, {});
  My_game.associate = function(models) {
    // associations can be defined here
  };
  return My_game;
};