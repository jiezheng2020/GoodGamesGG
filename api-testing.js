const fetch = require("node-fetch");
const express = require("express");
const { sequelize, Game, Console } = require("./db/models");
const faker = require("faker");
// const Op = Sequelize.Op;

const GetGames = async () => {
  const gameconsoles = [];
  const consoles = await Console.findAll();
  console.log(consoles);
  // const games = await Game.findAll();
  // console.log(games);
  // const consoles = await Console.findAll();
  // for (let i = 0; i < games.length; i++) {
  //   const gameId = games[i].id;
  //   let randConsole = Math.floor(Math.random() * 5);
  //   if (randConsole === 0) randConsole++;

  //   let newGame = {
  //     gameId: gameId,
  //     consoleId: randConsole,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   };
  //   gameconsoles.push(newGame);
  // }
  await sequelize.close();
};


const getGames = async () => {
  // const data = await fetch('https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-added?key=26ac0f3d2391457087937165a3fbeceb');
  // const data = await fetch('https://api.rawg.io/api/publishers?key=26ac0f3d2391457087937165a3fbeceb');
  const data = await fetch('https://api.rawg.io/api/games?key=26ac0f3d2391457087937165a3fbeceb&page_size=3');
  const { results } = await data.json()
  console.log(results)
  //
}
getGames()

