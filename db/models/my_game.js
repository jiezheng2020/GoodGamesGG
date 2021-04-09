'use strict';
module.exports = (sequelize, DataTypes) => {
  const My_game = sequelize.define('My_game', {
    played: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER
  }, {});
  My_game.associate = function(models) {
    // My_game.belongsTo(models.User, { foreignKey: 'userId' });
    // My_game.belongsTo(models.Game, { foreignKey: 'gameId' })
  };
  return My_game;
};