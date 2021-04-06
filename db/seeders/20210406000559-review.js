'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {body: 'Okay at best',userId: 1,gameId: 2,createdAt: new Date(),updatedAt: new Date(),},
      {body: 'Phat',userId: 2,gameId: 1,createdAt: new Date(),updatedAt: new Date(),},
      {body: 'Phat',userId: 1,gameId: 1,createdAt: new Date(),updatedAt: new Date(),},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
