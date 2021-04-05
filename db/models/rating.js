'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    rating: {
      type: DataTypes.INTEGER,
      max: 5,
      min: 1,
    },
    userId: {
      allowNull:false,
      type: DataTypes.INTEGER
    },
    gameId: {
      allowNull:false,
      type: DataTypes.INTEGER
    },
  }, {});
  Rating.associate = function(models) {
    // associations can be defined here
  };
  return Rating;
};