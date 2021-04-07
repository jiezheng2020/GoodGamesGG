'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a title.'
        }
      }
    },
    publisher: DataTypes.STRING,
    developer: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    description: DataTypes.TEXT,
    overallRating: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 1.0,
        max: 5.0,
      }
    },
    imageHref: DataTypes.STRING
  }, {});
  Game.associate = function (models) {
    Game.belongsToMany(models.User, {
      through: 'Rating',
      as: 'user_ratings',
      otherKey: 'userId',
      foreignKey: 'gameId'
    });

    Game.belongsToMany(models.User, {
      through: 'My_game',
      as: 'user_mygames',
      otherKey: 'userId',
      foreignKey: 'gameId'
    });

    Game.belongsToMany(models.Library, {
      through: 'Library_game',
      as: 'library_games',
      otherKey: 'libraryId',
      foreignKey: 'gameId'
    });

    Game.belongsToMany(models.Console, {
      through: 'Game_console',
      otherKey: 'consoleId',
      foreignKey: 'gameId'
    });
  };
  return Game;
};
