'use strict';

const bcrypt = require('bcrypt');
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {

    const password = bcrypt.hashSync('goodGames2!', 10);
    const demoTime = bcrypt.hashSync('demoTime', 10);
    let users = [
      { firstName: 'John', lastName: 'Doe', userName: 'johnTheDoeMan', email: 'JohnnyDoe@john.com', hashedPassword: password, createdAt: new Date(), updatedAt: new Date() },
      { firstName: 'Kyle', lastName: 'Powers', userName: 'kpThaSavage', email: 'Kyle@Powers.com', hashedPassword: password, createdAt: new Date(), updatedAt: new Date() },
      { firstName: 'Brent', lastName: 'Arimoto', userName: 'arimotoChanUwu', email: 'Brent@Arimoto.com', hashedPassword: password, createdAt: new Date(), updatedAt: new Date() },
      { firstName: 'Kevin', lastName: 'Zheng', userName: 'scrumMaster', email: 'Kevin@Zheng.com', hashedPassword: password, createdAt: new Date(), updatedAt: new Date() },
      { firstName: 'James', lastName: 'Lentzsch', userName: 'FlyGuy69', email: 'James@castingcouch.ent', hashedPassword: password, createdAt: new Date(), updatedAt: new Date() },
      { firstName: 'Demo', lastName: 'User', userName: 'DemoUser', email: 'Demo@User.net', hashedPassword: demoTime, createdAt: new Date(), updatedAt: new Date() },
    ];

    const randoms = 28;

    for (let i = 7; i < randoms; i++) {
      let newUser = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        userName: faker.internet.userName(),
        email: faker.internet.email(),
        hashedPassword: bcrypt.hashSync('password', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      users.push(newUser);
    }


    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {});
  }
};
