'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Users', [
        {firstName: 'John', lastName: 'Doe', userName: 'johnTheDoeMan', email: 'JohnnyDoe@john.com', hashedPassword: 'password', createdAt: new Date(), updatedAt: new Date()},
        {firstName: 'Kyle', lastName: 'Powers', userName: 'kpThaSavage', email: 'Kyle@Powers.com', hashedPassword: 'PowPow', createdAt: new Date(), updatedAt: new Date()},
        {firstName: 'Brent', lastName: 'Arimoto', userName: 'arimotoChanUwu', email: 'Brent@Arimoto.com', hashedPassword: 'Arimoto', createdAt: new Date(), updatedAt: new Date()},
        {firstName: 'Kevin', lastName: 'Zheng', userName: 'scrumMaster', email: 'Kevin@Zheng.com', hashedPassword: 'Zheng', createdAt: new Date(), updatedAt: new Date()},
        {firstName: 'James', lastName: 'Lentzsch', userName: 'FlyGuy69', email: 'James@castingcouch.ent', hashedPassword: 'Lentzsch', createdAt: new Date(), updatedAt: new Date()},
    ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Users', null, {});
  }
};
