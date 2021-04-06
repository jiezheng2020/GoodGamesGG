'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Games', [
        {title: 'God of War', publisher: 'Sony Interactive Entertainment', developer: 'Santa Monica Studio', releaseDate: '2018-04-20', description: 'A man ventures out on a quest to become a God.....of war.', overallRating: 5.0, imageHref: './images/GOW-OG-image.png', createdAt: new Date(), updatedAt: new Date()},
        {title: 'Final Fantasy XV', publisher: 'Square Enix', developer: 'Square Enix Business Division', releaseDate: '2016-11-29', description: 'A group of friends must do a bunch of endless sidequests and fight monsters so that they can save their kingdom.', overallRating: 4.2, imageHref: './images/finalfantasy.png', createdAt: new Date(), updatedAt: new Date()},
        {title: 'Ghost of Tsushima', publisher: 'Sony Interactive Entertainment', developer: 'Sucker Punch Productions', releaseDate: '2020-07-17', description: 'A disgraced Samurai from fuedal era Japan must stave off a Mongolian invasion with his trusty sword and the help of a few scoundrels along the way.', overallRating: 5.0, imageHref: './images/220px-Ghost_of_Tsushima.png', createdAt: new Date(), updatedAt: new Date()},
        {title: 'Grand Theft Auto V', publisher: 'Rokcstar Games', developer: 'Rockstar North', releaseDate: '2013-09-17', description: 'Play as three different characters to pull off the ultimate heist.', overallRating: 4.9, imageHref: './images/Grand_Theft_Auto_V.png', createdAt: new Date(), updatedAt: new Date()},
        {title: 'NBA 2K21', publisher: '2K Sports', developer: 'Visual Concepts', releaseDate: '2020-09-04', description: 'Play basketball as your favorite team.', overallRating: 2.7, imageHref: './images/nba2k21.png', createdAt: new Date(), updatedAt: new Date()},
        {title: 'Assassin\'s Creed: Odyssey', publisher: 'Ubisoft', developer: 'Ubisoft Quebec', releaseDate: '2018-10-05', description: 'Go back in time and play as a Roman who fights for justice in a corrupt world. ', overallRating: 3.6, imageHref: './images/assassins_creed_odyseey.png', createdAt: new Date(), updatedAt: new Date()},
        {title: 'Spiderman', publisher: 'Sony Interactive Entertainment', developer: 'Insomniac Games', releaseDate: '2018-09-07', description: 'Swing through the rugged streets of New York as your friendly neighborhood SpiderMan!', overallRating: 4.5, imageHref: './images/marvels-spider-man-cover.png', createdAt: new Date(), updatedAt: new Date()},
        {title: 'Horizon Zero Dawn', publisher: 'Sony Interactive Entertainment', developer: 'Guerilla Games', releaseDate: '2017-02-28', description: 'In a world where technology could threaten your very existence how will you wield it\'s power?', overallRating: 4.2, imageHref: './images/horizon_zero_dawn.png', createdAt: new Date(), updatedAt: new Date()},
        {title: 'The Last of Us', publisher: 'Sony Computer Entertainment', developer: 'Naughty Dog', releaseDate: '2013-06-14', description: 'Facing the threat of a zombie apocalypse, one girl must venture out to deliver the cure to the last remaining civilization on Earth.', overallRating: 4.9, imageHref: './images/Video_Game_Cover_-_The_Last_of_Us.png', createdAt: new Date(), updatedAt: new Date()},
        {title: 'The Last Guardian', publisher: 'Sony Computer Entertainment', developer: 'Japan Studio GenDesign', releaseDate: '2016-12-06', description: 'A young monk goes on a journey he will never forget.', overallRating: 4.1, imageHref: './images/lastguardian.png', createdAt: new Date(), updatedAt: new Date()},
        {title: 'Super Smash Bros. Ultimate', publisher: 'Nintendo', developer: 'Bandai Namco Studios', releaseDate: '2018-12-07', description: 'Play as your favorite characters in this ultimate fighting game.', overallRating: 3.9, imageHref: './images/smachBros.png', createdAt: new Date(), updatedAt: new Date()},
        {title: 'Mario Kart 8', publisher: 'Nintendo', developer: 'Nintendo EAD', releaseDate: '2017-04-28', description: 'Join Mario and pals in this fast-paced racing game.', overallRating: 4.6, imageHref: './images/mario-kart-8-deluxe.png', createdAt: new Date(), updatedAt: new Date()},
        {title: 'The Legend of Zelda: Breath of the Wild', publisher: 'Nintendo', developer: 'Nintendo EPD', releaseDate: '2017-03-03', description: 'Battle your way across Hyrule as Link, yet again, to reclaim the kingdom and save the princess.', overallRating: 5.0, imageHref: './images/legend_of_zelda.png', createdAt: new Date(), updatedAt: new Date()},
    ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Games', null, {});
  }
};