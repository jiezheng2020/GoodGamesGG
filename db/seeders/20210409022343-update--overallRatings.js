'use strict';

const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const games = await models.Game.findAll({include:[{model:models.User, as:'user_ratings'}]});
    games.forEach(async(game)=>{
      let total = 0;

      game.user_ratings.forEach((user)=>{
        total+=parseInt(user.Rating.overall)
      })

      if(total){game.overallRating=(total/game.user_ratings.length).toFixed(1);}
      else {game.overallRating=0;};

      await game.save()
    })

    return queryInterface.bulkInsert('Ratings', [

      { overall: 5, body: 'dfgd', userId: 1, gameId: 1, createdAt: new Date(), updatedAt: new Date(), },
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Ratings', null, {});
  }
};
