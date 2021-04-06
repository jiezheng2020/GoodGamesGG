'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    overall: DataTypes.INTEGER,
    body: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER
  }, {});
  Rating.associate = function(models) {
    // associations can be defined here
  };
  return Rating;
};