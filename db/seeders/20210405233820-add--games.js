'use strict';

const fetch = require('node-fetch');


module.exports = {
  up: async (queryInterface, Sequelize) => {


    const data = await fetch('http://api.rawg.io/api/games?key=db5497722d9845ee89d93908ec7b8afa');
    const { results } = await data.json()
    // console.log(gamesApi);



    const games = [
      { title: 'God of War', publisher: 'Sony Interactive Entertainment', developer: 'Santa Monica Studio', releaseDate: '2018-04-20', description: 'A man ventures out on a quest to become a God.....of war.', overallRating: 5.0, imageHref: './images/GOW-OG-image.png', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Final Fantasy XV', publisher: 'Square Enix', developer: 'Square Enix Business Division', releaseDate: '2016-11-29', description: 'A group of friends must do a bunch of endless sidequests and fight monsters so that they can save their kingdom.', overallRating: 4.2, imageHref: './images/finalfantasy.png', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Ghost of Tsushima', publisher: 'Sony Interactive Entertainment', developer: 'Sucker Punch Productions', releaseDate: '2020-07-17', description: 'A disgraced Samurai from fuedal era Japan must stave off a Mongolian invasion with his trusty sword and the help of a few scoundrels along the way.', overallRating: 5.0, imageHref: './images/220px-Ghost_of_Tsushima.png', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Grand Theft Auto V', publisher: 'Rokcstar Games', developer: 'Rockstar North', releaseDate: '2013-09-17', description: 'Play as three different characters to pull off the ultimate heist.', overallRating: 4.9, imageHref: './images/Grand_Theft_Auto_V.png', createdAt: new Date(), updatedAt: new Date() },
      { title: 'NBA 2K21', publisher: '2K Sports', developer: 'Visual Concepts', releaseDate: '2020-09-04', description: 'Play basketball as your favorite team.', overallRating: 2.7, imageHref: './images/nba2k21.png', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Assassin\'s Creed: Odyssey', publisher: 'Ubisoft', developer: 'Ubisoft Quebec', releaseDate: '2018-10-05', description: 'Go back in time and play as a Roman who fights for justice in a corrupt world. ', overallRating: 3.6, imageHref: './images/assassins_creed_odyseey.png', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Spiderman', publisher: 'Sony Interactive Entertainment', developer: 'Insomniac Games', releaseDate: '2018-09-07', description: 'Swing through the rugged streets of New York as your friendly neighborhood SpiderMan!', overallRating: 4.5, imageHref: './images/marvels-spider-man-cover.png', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Horizon Zero Dawn', publisher: 'Sony Interactive Entertainment', developer: 'Guerilla Games', releaseDate: '2017-02-28', description: 'In a world where technology could threaten your very existence how will you wield it\'s power?', overallRating: 4.2, imageHref: './images/horizon_zero_dawn.png', createdAt: new Date(), updatedAt: new Date() },
      { title: 'The Last of Us', publisher: 'Sony Computer Entertainment', developer: 'Naughty Dog', releaseDate: '2013-06-14', description: 'Facing the threat of a zombie apocalypse, one girl must venture out to deliver the cure to the last remaining civilization on Earth.', overallRating: 4.9, imageHref: './images/Video_Game_Cover_-_The_Last_of_Us.png', createdAt: new Date(), updatedAt: new Date() },
      { title: 'The Last Guardian', publisher: 'Sony Computer Entertainment', developer: 'Japan Studio GenDesign', releaseDate: '2016-12-06', description: 'A young monk goes on a journey he will never forget.', overallRating: 4.1, imageHref: './images/lastguardian.png', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Super Smash Bros. Ultimate', publisher: 'Nintendo', developer: 'Bandai Namco Studios', releaseDate: '2018-12-07', description: 'Play as your favorite characters in this ultimate fighting game.', overallRating: 3.9, imageHref: './images/smachBros.png', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Mario Kart 8', publisher: 'Nintendo', developer: 'Nintendo EAD', releaseDate: '2017-04-28', description: 'Join Mario and pals in this fast-paced racing game.', overallRating: 4.6, imageHref: './images/mario-kart-8-deluxe.png', createdAt: new Date(), updatedAt: new Date() },
      { title: 'The Legend of Zelda: Breath of the Wild', publisher: 'Nintendo', developer: 'Nintendo EPD', releaseDate: '2017-03-03', description: 'Battle your way across Hyrule as Link, yet again, to reclaim the kingdom and save the princess.', overallRating: 5.0, imageHref: './images/legend_of_zelda.png', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Fornite', publisher: 'Epic Games, Water Bros. Interactive Entertainment', developer: 'Epic Games, People Can Fly', releaseDate: new Date(2017, 7, 21), description: 'Fornite', overallRating: 3, createdAt: new Date(), updatedAt: new Date(), },
      { title: 'League of Legends', publisher: 'Riot Games', developer: 'Riot Games', releaseDate: new Date(2009, 10, 27), description: 'League of Legends', overallRating: 4, createdAt: new Date(), updatedAt: new Date(), },
      { title: 'Rocket League', publisher: 'Psyonix', developer: 'Psyonix, Panic Button Games', releaseDate: new Date(2015, 7, 7), description: 'Rocket League', overallRating: 4, createdAt: new Date(), updatedAt: new Date(), },
      { title: 'Apex Legends', publisher: 'EA Games', developer: 'Respawn Entertainment, Panic Button Games', releaseDate: new Date(2019, 2, 4), description: 'Apex Legends', overallRating: 3, createdAt: new Date(), updatedAt: new Date(), },
      { title: 'Valorant', publisher: 'Riot Games', developer: 'Riot Games', releaseDate: new Date(2020, 6, 2), description: 'Valorant', overallRating: 4, createdAt: new Date(), updatedAt: new Date(), },
      { title: 'Kingdom Hearts III', publisher: 'Square Enix', developer: 'Square Enix', releaseDate: new Date(2019, 1, 25), description: 'Kngdom Hearts III', overallRating: 4, createdAt: new Date(), updatedAt: new Date(), },
      { title: 'Persona 5', publisher: 'Atlus', developer: 'Atlus, P Studio', releaseDate: new Date(2016, 9, 15), description: 'Persona 5', overallRating: 5, createdAt: new Date(), updatedAt: new Date(), },
      { title: 'Final Fantasy VII Remake', publisher: 'Square Enix', developer: 'Square Enix', releaseDate: new Date(2020, 4, 10), description: 'Final Fantasy VII', overallRating: 4, createdAt: new Date(), updatedAt: new Date(), },
      { title: 'Pokemon Sword', publisher: 'Nintendo, The Pokemon Company', developer: 'Game Freak', releaseDate: new Date(2019, 11, 15), description: 'Pokemon Sword', overallRating: 2, createdAt: new Date(), updatedAt: new Date(), },
      { title: 'Animal Crossing: New Horizons', publisher: 'Nintendo', developer: 'Nintendo', releaseDate: new Date(2020, 3, 20), description: 'Animal Crossing', overallRating: 5, createdAt: new Date(), updatedAt: new Date(), },
    ]

    const newGames = results.map((game) => {
      return {
        title: game.name,
        publisher: 'Sony Interactive Entertainment',
        developer: 'bleh',
        releaseDate: game.released,
        description: game.name,
        overallRating: game.rating,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    games.push(...newGames)
    return queryInterface.bulkInsert('Games', games, {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Games', null, {});
  }
};
