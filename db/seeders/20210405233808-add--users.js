'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Users', [
        {firstName: 'John', lastName: 'Doe', userName: 'johnTheDoeMan', email: 'JohnnyDoe@john.com', hashedPassword: 'password'},
        {firstName: 'Kyle', lastName: 'Powers', userName: 'kpThaSavage', email: 'Kyle@Powers.com', hashedPassword: 'PowPow'},
        {firstName: 'Brent', lastName: 'Arimoto', userName: 'arimotoChanUwu', email: 'Brent@Arimoto.com', hashedPassword: 'Arimoto'},
        {firstName: 'Kevin', lastName: 'Zheng', userName: 'scrumMaster', email: 'Kevin@Zheng.com', hashedPassword: 'Zheng'},
        {firstName: 'James', lastName: 'Lentzsch', userName: 'FlyGuy69', email: 'James@castingcouch.net', hashedPassword: 'Lentzsch'},
    ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Users', null, {});
  }
};
