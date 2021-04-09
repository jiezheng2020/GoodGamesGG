"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "User_consoles",
      [
        {
          userId: 4,
          consoleId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 6,
          consoleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 6,
          consoleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 6,
          consoleId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 6,
          consoleId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("User_consoles", null, {});
  },
};
