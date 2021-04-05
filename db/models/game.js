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
    Game.belongsToMany(models.User, {
      through: 'Rating',
      otherKey: 'userId',
      foreignKey: 'gameId'
    });

    Game.belongsToMany(models.User, {
      through: 'Review',
      otherKey: 'userId',
      foreignKey: 'gameId'
    });

    Game.belongsToMany(models.User, {
      through: 'My_game',
      otherKey: 'userId',
      foreignKey: 'gameId'
    });

    Game.belongsToMany(models.Library, {
      through: 'Library_game',
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
