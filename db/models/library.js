'use strict';
module.exports = (sequelize, DataTypes) => {
  const Library = sequelize.define('Library', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Library.associate = function(models) {
    // associations can be defined here
  };
  return Library;
};