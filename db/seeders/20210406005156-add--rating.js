'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Ratings', [
      {overall: 2,userId: 1,gameId: 2,createdAt: new Date(),updatedAt: new Date(),},
      {overall: 5,userId: 2,gameId: 1,createdAt: new Date(),updatedAt: new Date(),},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Ratings', null, {});
  }
};
