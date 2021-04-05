'use strict';
module.exports = (sequelize, DataTypes) => {
  const Library = sequelize.define('Library', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Library.associate = function(models) {
    Library.belongsTo(models.User, {  foreignKey: 'userId' });

    Library.belongsToMany(models.Game, {
      through: 'Library_game',
      otherKey: 'gameId',
      foreignKey: 'libraryId'
    });


  };
  return Library;
};
