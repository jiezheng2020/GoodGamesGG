'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    overall: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a review'
        },
        min: 1,
        max: 5,
      }
    },
    body: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER
  }, {});
  Rating.associate = function (models) {
    // associations can be defined here
  };
  return Rating;
};
