"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
<<<<<<< Updated upstream
    return queryInterface.bulkInsert(
      "My_games",
      [
        {
          played: 1,
          userId: 6,
          gameId: 24,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          played: 2,
          userId: 6,
          gameId: 27,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          played: 1,
          userId: 6,
          gameId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          played: 1,
          userId: 6,
          gameId: 21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          played: 2,
          userId: 6,
          gameId: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          played: 2,
          userId: 6,
          gameId: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          played: 0,
          userId: 6,
          gameId: 26,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          played: 1,
          userId: 6,
          gameId: 25,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          played: 0,
          userId: 6,
          gameId: 31,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          played: 0,
          userId: 6,
          gameId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          played: 2,
          userId: 6,
          gameId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          played: 0,
          userId: 6,
          gameId: 33,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          played: 0,
          userId: 6,
          gameId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          played: 1,
          userId: 6,
          gameId: 30,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          played: 2,
          userId: 6,
          gameId: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("My_games", null, {});
  },
=======

      return queryInterface.bulkInsert('My_games', [
        { played: 1, userId: 6, gameId: 24, createdAt: new Date(), updatedAt: new Date() },
        { played: 2, userId: 6, gameId: 27, createdAt: new Date(), updatedAt: new Date() },
        { played: 1, userId: 6, gameId: 2, createdAt: new Date(), updatedAt: new Date() },
        { played: 1, userId: 6, gameId: 21, createdAt: new Date(), updatedAt: new Date() },
        { played: 2, userId: 6, gameId: 13, createdAt: new Date(), updatedAt: new Date() },
        { played: 2, userId: 6, gameId: 12, createdAt: new Date(), updatedAt: new Date() },
        { played: 0, userId: 6, gameId: 26, createdAt: new Date(), updatedAt: new Date() },
        { played: 1, userId: 6, gameId: 25, createdAt: new Date(), updatedAt: new Date() },
        { played: 0, userId: 6, gameId: 31, createdAt: new Date(), updatedAt: new Date() },
        { played: 0, userId: 6, gameId: 6, createdAt: new Date(), updatedAt: new Date() },
        { played: 2, userId: 6, gameId: 9, createdAt: new Date(), updatedAt: new Date() },
        { played: 0, userId: 6, gameId: 33, createdAt: new Date(), updatedAt: new Date() },
        { played: 0, userId: 6, gameId: 3, createdAt: new Date(), updatedAt: new Date() },
        { played: 1, userId: 6, gameId: 30, createdAt: new Date(), updatedAt: new Date() },
        { played: 2, userId: 6, gameId: 11, createdAt: new Date(), updatedAt: new Date() }
      ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('My_games', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
>>>>>>> Stashed changes
};
