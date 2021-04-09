"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
<<<<<<< Updated upstream
    return queryInterface.bulkInsert(
      "Libraries",
      [
        {
          name: "John's Suggestions",
          userId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Managment Games",
          userId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Play with SO",
          userId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sims",
          userId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Party Games",
          userId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Libraries", null, {});
  },
=======

      return queryInterface.bulkInsert('Libraries', [
        { name: 'John\'s Suggestions', userId: 6, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Managment Games', userId: 6, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Play with SO', userId: 6, createdAt: new Date(), updatedAt: new Date()},
        { name: 'Sims', userId: 6, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Party Games', userId: 6, createdAt: new Date(), updatedAt: new Date()}
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Libraries', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
>>>>>>> Stashed changes
};
