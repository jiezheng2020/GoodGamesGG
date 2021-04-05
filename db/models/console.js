'use strict';
module.exports = (sequelize, DataTypes) => {
  const Console = sequelize.define('Console', {
    name: DataTypes.STRING
  }, {});
  Console.associate = function(models) {
    // associations can be defined here
  };
  return Console;
};