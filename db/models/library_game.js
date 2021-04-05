'use strict';
module.exports = (sequelize, DataTypes) => {
  const Library_game = sequelize.define('Library_game', {
    gameId: DataTypes.INTEGER,
    libraryId: DataTypes.INTEGER
  }, {});
  Library_game.associate = function(models) {
    // associations can be defined here
  };
  return Library_game;
};