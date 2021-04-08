'use strict';
module.exports = (sequelize, DataTypes) => {
  const Library = sequelize.define('Library', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a name for this Library.'
        },
        notEmpty: {
          msg: 'Library name cannot be empty.'
        }
      }
    },
    userId: DataTypes.INTEGER
  }, {});
  Library.associate = function (models) {
    Library.belongsTo(models.User, { foreignKey: 'userId' });

    Library.belongsToMany(models.Game, {
      through: 'Library_game',
      as: 'library_games',
      otherKey: 'gameId',
      foreignKey: 'libraryId'
    });

  };
  return Library;
};
