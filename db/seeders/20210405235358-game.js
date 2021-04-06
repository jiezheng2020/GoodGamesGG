'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Games', [
      {title: 'Fornite',publisher: 'Epic Games, Water Bros. Interactive Entertainment',developer: 'Epic Games, People Can Fly',releaseDate: new Date(2017,7,21),description: 'Fornite',overallRating: 3,imageHref: '/image/fortnite.png',createdAt: new Date(),updatedAt: new Date(),},
      {title: 'League of Legends',publisher: 'Riot Games',developer: 'Riot Games',releaseDate: new Date(2009,10,27),description: 'League of Legends',overallRating: 4,imageHref: '/image/league_of_legends.png',createdAt: new Date(),updatedAt: new Date(),},
      {title: 'Rocket League',publisher: 'Psyonix',developer: 'Psyonix, Panic Button Games',releaseDate: new Date(2015,7,7),description: 'Rocket League',overallRating: 4, imageHref: '/image/rocket_league.png',createdAt: new Date(),updatedAt: new Date(),},
      {title: 'Apex Legends',publisher: 'EA Games',developer: 'Respawn Entertainment, Panic Button Games',releaseDate: new Date(2019,2,4),description: 'Apex Legends',overallRating: 3,imageHref: '/image/apex_legends.png',createdAt: new Date(),updatedAt: new Date(),},
      {title: 'Valorant',publisher: 'Riot Games',developer: 'Riot Games', releaseDate: new Date(2020,6,2), description: 'Valorant', overallRating: 4, imageHref: '/image/valorant.png', createdAt: new Date(), updatedAt: new Date(),},
      {title: 'Kingdom Hearts III',publisher: 'Square Enix',developer: 'Square Enix',releaseDate: new Date(2019,1,25),description: 'Kngdom Hearts III',overallRating: 4,imageHref: '/image/kh3.png',createdAt: new Date(),updatedAt: new Date(),},
      {title: 'Persona 5',publisher: 'Atlus',developer: 'Atlus, P Studio',releaseDate: new Date(2016,9,15),description: 'Persona 5',overallRating: 5,imageHref: '/image/persona_5.png',createdAt: new Date(),updatedAt: new Date(),},
      {title: 'Final Fantasy VII Remake',publisher: 'Square Enix',developer: 'Square Enix', releaseDate: new Date(2020,4,10), description: 'Final Fantasy VII', overallRating: 4,imageHref: '/image/ff7_remake.png',createdAt: new Date(),updatedAt: new Date(),},
      {title: 'Pokemon Sword',publisher: 'Nintendo, The Pokemon Company',developer: 'Game Freak',releaseDate: new Date(2019,11,15),description: 'Pokemon Sword',overallRating: 2,imageHref: '/image/pokemon_sword.png',createdAt: new Date(),updatedAt: new Date(),},
      {title: 'Super Smash Bros Ultimate',publisher: 'Nintendo',developer: 'Sora Ltd., BANDAI NAMCO Studios, Nintendo',releaseDate: new Date(2018,12,7),description: 'Super Smash Bros Ultimate',overallRating: 3,imageHref: '/image/super_smash_bros_u.png',createdAt: new Date(),updatedAt: new Date(),},
      {title: 'Animal Crossing: New Horizons',publisher: 'Nintendo',developer: 'Nintendo', releaseDate: new Date(2020,3,20), description: 'Animal Crossing', overallRating: 5,imageHref: '/image/animal_cross_nh.png',createdAt: new Date(),updatedAt: new Date(),},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Games', null, {});
  }
};
