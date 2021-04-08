'use strict';

const models = require('../models')
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const ratings = [
      { overall: 2, body: 'fdgd', userId: 1, gameId: 2, createdAt: new Date(), updatedAt: new Date(), },
      { overall: 5, body: 'dfgd', userId: 2, gameId: 1, createdAt: new Date(), updatedAt: new Date(), },
    ]

    const games = await models.Game.findAll();
    const users = await models.User.findAll();

    for (let i = 0; i < 20; i++) {
      const randGame = Math.floor(Math.random() * (games.length - 1) + 1);
      const randUser = Math.floor(Math.random() * (users.length - 1) + 1);
      const randOverall = Math.floor(Math.random() * (5-1) + 1);
      let newRating = {
        overall: randOverall,
        body: faker.lorem.paragraph(),
        userId: randUser,
        gameId: randGame,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      ratings.push(newRating);
    }
    return queryInterface.bulkInsert('Ratings', ratings, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Ratings', null, {});
  }
};
