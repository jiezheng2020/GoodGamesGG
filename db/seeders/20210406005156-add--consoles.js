'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Consoles', [
        { name: 'Playstation 4', createdAt: new Date(), updatedAt: new Date()},
        { name: 'Xbox One', createdAt: new Date(), updatedAt: new Date()},
        { name: 'PC', createdAt: new Date(), updatedAt: new Date()},
        { name: 'Nintendo Switch', createdAt: new Date(), updatedAt: new Date()},
      ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Consoles', null, {});
  }
};
