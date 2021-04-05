'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    title: DataTypes.STRING,
    publisher: DataTypes.STRING,
    developer: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    description: DataTypes.TEXT,
    overallRating: DataTypes.DECIMAL,
    imageHref: DataTypes.STRING
  }, {});
  Game.associate = function(models) {
    // associations can be defined here
  };
  return Game;
};