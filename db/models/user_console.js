'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_console = sequelize.define('User_console', {
    userId: DataTypes.INTEGER,
    consoleId: DataTypes.INTEGER
  }, {});
  User_console.associate = function(models) {
    // associations can be defined here
  };
  return User_console;
};