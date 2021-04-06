/*************************** REQUIRES ***************************/
const express = require("express");
const { check, validationResult } = require("express-validator");

const { Game, Rating, User } = require("../db/models")
/*************************** ROUTER SETUP ***************************/
const router = express.Router();

/*************************** MIDDLEWARE ***************************/
const {
  csrfProtection,
  asyncHandler,
  handleValidationErrors,
} = require("../utils.js");

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

// comment
/*************************** ROUTES ***************************/

// All Games Page
router.get('/', asyncHandler(async(req,res)=>{
    // Finds all games from the database
    const games = await Game.findAll();

    // Renders games page with list of all games from A-Z
    res.render("allgames", { title: "All Games", games });
  })
);

// Game Not Found FUNCTION
const gameNotFoundError = (id) => {
  const error = new Error(`Game with ${id} could not be found`);
  error.title = "Game not found";
  error.status = 404;
  return error;
};

const ratingExists = () =>{
    const error = new Error(`Review for game with ${id} already exists`);
    error.title = "Ratings already exists";
    error.status = 400;
    return error;
}

// Specific Games Page
router.get('/:id(\\d+)', csrfProtection, asyncHandler(async(req,res,next)=>{
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
      next(gameNotFoundError(gameId));
    }
}))


// Create review or rating on game
router.post('/:id(\\d+)', asyncHandler(async(req,res,next)=>{
    // Defines variables
    const gameId = req.params.id
    const userId = 1;
    const { overall, body } = req.body

    let rating = await Rating.findOne({where:{gameId, userId}})

    if(rating){
        next(ratingExists(gameId))
    } else {
        // Creates review instance with above variables
        rating = await Rating.create({
            overall,
            body,
            userId,
            gameId
        });

        // Grabs all reviews
        const game = await Game.findByPk(gameId,{include:[{model:User, as:'user_ratings'}]});
        const {user_ratings} = game;

        // Sends response with review, and reviews
        res.json({game});
    }

}))


// Edit review or rating on game
router.put('/:id(\\d+)', asyncHandler(async(req,res,next)=>{
    // Defines variables
    const gameId = req.params.id
    const userId = 1;
    const { overall, body } = req.body

    // Creates rating instance with above variables
    let rating = await Rating.findOne({where:{gameId, userId}})

    if(rating){
        rating.overall = overall
        rating.body = body

        await rating.save()

        res.json({overall, body})

    } else {
        next(gameNotFoundError(gameId))
    }

}))


// Delete review or rating on game
router.delete('/:id(\\d+)', asyncHandler(async(req,res,next)=>{
    // Defines variables
    const gameId = req.params.id
    const userId = 1;

    // Creates rating instance with above variables
    let rating = await Rating.findOne({where:{gameId, userId}})

    if(rating){
        await rating.destroy()
        res.status(204).end()

    } else {
        next(gameNotFoundError(gameId))
    }

}))



/*************************** EXPORTS ***************************/
module.exports = router;
