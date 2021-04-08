"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Game_consoles",
      [
        {
          gameId: 1,
          consoleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 2,
          consoleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 2,
          consoleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 2,
          consoleId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 3,
          consoleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 4,
          consoleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 4,
          consoleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 4,
          consoleId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 5,
          consoleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 5,
          consoleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 5,
          consoleId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 5,
          consoleId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 6,
          consoleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 6,
          consoleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 6,
          consoleId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 6,
          consoleId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 7,
          consoleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 8,
          consoleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 8,
          consoleId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Game_consoles", null, {});
  },
};
