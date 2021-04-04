'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    body: {
      type: DataTypes.TEXT
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
  Review.associate = function(models) {
    // associations can be defined here
  };
  return Review;
};