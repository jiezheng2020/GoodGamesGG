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
  // const data = await fetch('https://api.rawg.io/api/games?key=26ac0f3d2391457087937165a3fbeceb&page_size=3');
  // const { results } = await data.json()
  // console.log(results)
  //

  brentsArray=['fortnite', 'league-of-legends', 'rocket-league', 'apex-legends', 'valorant', 'kingdom-hearts-iii', 'persona-5', 'final-fantasy-vii-remake', 'pokemon-2019', 'animal-crossing-2019']
  hrefArray=["/images/fortnite.jpg","/images/leagueoflegends.jpg","/images/rocketleague.jpg","/images/apex.jpg","/images/valorant.png","/images/kh3.png","/images/persona5.jpg","/images/ff7.jpg","/images/pokemonsword.jpg","/images/animalcrossing.jpg"]
  publisherArray=["Epic Games, People Can Fly"]

  const res = brentsArray.map(async(slug)=>{
    let res = await fetch(`https://api.rawg.io/api/games/${slug}`)
    return res.json()
  })

  const games = await Promise.all(res)

  let brentGames = [];

  for(let i=0;i<games.length;i++){
    let g = {
      title: games[i].name,
      publisher: (games[i].publishers.length) ? games[i].publishers.map(el=>el.name).join(', ') : publisherArray[i],
      developer: games[i].developers.map(el=>el.name).join(', '),
      releaseDate: games[i].released,
      description: games[i].name,
      overallRating: games[i].rating,
      imageHref: hrefArray[i],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    brentGames.push(g)
  }

  console.log(brentGames)
}




getGames()
