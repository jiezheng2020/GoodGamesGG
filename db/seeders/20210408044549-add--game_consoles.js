"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Game_consoles",
      [
        { gameId: 1, consoleId: 1 },
        { gameId: 2, consoleId: 1 },
        { gameId: 2, consoleId: 2 },
        { gameId: 2, consoleId: 3 },
        { gameId: 3, consoleId: 1 },
        { gameId: 4, consoleId: 1 },
        { gameId: 4, consoleId: 2 },
        { gameId: 4, consoleId: 3 },
        { gameId: 5, consoleId: 1 },
        { gameId: 5, consoleId: 2 },
        { gameId: 5, consoleId: 3 },
        { gameId: 5, consoleId: 4 },
        { gameId: 6, consoleId: 1 },
        { gameId: 6, consoleId: 2 },
        { gameId: 6, consoleId: 3 },
        { gameId: 6, consoleId: 4 },
        { gameId: 7, consoleId: 1 },
        { gameId: 8, consoleId: 1 },
        { gameId: 8, consoleId: 3 },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Game_consoles", null, {});
  },
};
