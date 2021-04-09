"use strict";
const models = require("../models");
const faker = require("faker");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const gameconsoles = [
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
    ];

    const games = await models.Game.findAll({ where: { id: { [Op.gte]: 9 } } });
    const consoles = await models.Console.findAll();

    for (let i = 0; i < games.length; i++) {
      const gameId = games[i].id;
      let randConsole = Math.floor(Math.random() * 5);
      if (randConsole === 0) randConsole++;

      let newGame = {
        gameId: gameId,
        consoleId: randConsole,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      gameconsoles.push(newGame);
    }

    return queryInterface.bulkInsert("Game_consoles", gameconsoles, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Game_consoles", null, {});
  },
};
