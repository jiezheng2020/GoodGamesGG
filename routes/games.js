/*************************** REQUIRES ***************************/
const express = require("express");
const { check, validationResult } = require('express-validator')

const { Game, Rating, User } = require("../db/models")
/*************************** ROUTER SETUP ***************************/
const router = express.Router();

/*************************** MIDDLEWARE ***************************/
const { csrfProtection, asyncHandler, handleValidationErrors } = require('../utils.js')

const validateReviewOrRating = [
    check('body')
        .custom((body, { req } ) => {
            const { overall } = req.body;
            if (!body.length && !overall.length) {
                throw new Error('Please provide either a review or rating');
            }
            return true;
        }),
    check('overall')
        .custom((overall, { req } ) => {
            const { body } = req.body;
            if (!body.length && !overall.length) {
                throw new Error('Please provide either a review or rating');
            }
            return true;
        }),
]

/*************************** ROUTES ***************************/

// All Games Page
router.get('/', asyncHandler(async(req,res)=>{
    // Finds all games from the database
    const games = await Game.findAll();

    // Renders games page with list of all games from A-Z
    res.render('games', {title: 'All Games', games});
}));

// Game Not Found FUNCTION
const gameNotFoundError = (id) => {
    const error = new Error(`Game with ${id} could not be found`);
    error.title = "Game not found"
    error.status = 404;
    return error;
};

// Specific Games Page
router.get('/:id(\\d+)', csrfProtection, asyncHandler(async(req,res)=>{
    // Defines variables
    const gameId = req.params.id
    const userId = 1;

    // Finds game with the above id
    const game = await Game.findByPk(gameId,{include:[{model:User, as:'user_ratings'}]});

    // const reviews = await Review.findAll({where:{gameId}});
    // const ratings = await Rating.findall({where:{gameId}});

    if(game) {
        // Renders game page with specific game info
        res.render('game', {title:game.title, game, csrfToken:req.csrfToken()});
    } else {
        // Throws error if tweet not found
        next(gameNotFoundError(id));
    }
}))


// Create review or rating on game
router.post('/:id(\\d+)', asyncHandler(async(req,res)=>{
    console.log('test')
    // Defines variables
    const gameId = req.params.id
    const userId = 1;
    const { overall, body } = req.body

    // Creates review instance with above variables
    const rating = await Rating.create({
        overall,
        body,
        userId,
        gameId
    })

    // Grabs all reviews
    const game = await Game.findByPk(gameId,{include:[{model:User, as:'user_ratings'}]});
    const {user_ratings} = game

    // Sends response with review, and reviews
    res.json({user_ratings})

}))


// Edit review or rating on game
router.put('/:id(\\d+)', validateReviewOrRating, handleValidationErrors, csrfProtection, asyncHandler(async(req,res)=>{
    // Defines variables
    const gameId = req.params.id
    const userId = 1;
    const { overall, body } = req.body

    // Creates review instance with above variables
    const review = await Rating.create({
        overall,
        body,
        userId,
        gameId
    })

    // Grabs all reviews
    const game = await Game.findByPk(gameId,{include:[{model:User, as:'user_ratings'}]});
    const {user_ratings} = game

    // Sends response with review, and reviews
    res.json({user_ratings})

}))


// Delete review or rating on game
router.delete('/:id(\\d+)', handleValidationErrors, csrfProtection, asyncHandler(async(req,res)=>{
    // Defines variables
    const gameId = req.params.id
    const { rating, body, userId } = req.body.body

    // Creates review instance with above variables
    const review = await Rating.create({
        body,
        userId,
        gameId
    })

    // Grabs all reviews
    const game = await Game.findByPk(gameId,{include:[{model:User, as:'user_ratings'}]});
    const {user_ratings} = game

    // Sends response with review, and reviews
    res.json({user_ratings})

}))



/*************************** EXPORTS ***************************/
module.exports = router;
