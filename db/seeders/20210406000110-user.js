'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {firstName: 'Brent',lastName: 'Arimoto',userName:'barimoto',email:'barimoto14@gmail.com',hashedPassword:'$2a$10$TX.vcAoqU0cXRFGJzZU1BO.h.FhnvkBWt3FAsQFb1NfoPxbmMhg.i',createdAt: new Date(),updatedAt: new Date(),},
      {firstName: 'User',lastName: 'One',userName:'User1',email:'user1@gmail.com',hashedPassword:'$2a$10$Df3ZJdr9/Qg9zQ73ZHsVs.bUIZzcxfcOR3uZdHQT1gQrhEF/i7c1.',createdAt: new Date(),updatedAt: new Date(),},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
