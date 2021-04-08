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
        .custom((body, { req }) => {
            const { overall } = req.body;
            if (!body.length && !overall.length) {
                throw new Error('Please provide either a review or rating');
            }
            return true;
        }),

    check('overall')
        .custom((overall, { req }) => {
            const { body } = req.body;
            if (!body.length && !overall.length) {
                throw new Error('Please provide either a review or rating');
            }
            return true;
        }),
]

const updateOverallRatings = async()=>{

    const games = await Game.findAll({include:[{model:User, as:'user_ratings'}]});

    games.forEach(async(game)=>{
        let total = 0;

        game.user_ratings.forEach(async(user)=>{
          // console.log(user.userName)
          total+=parseInt(user.Rating.overall)
        })

        if(total){
            console.log(total,'/',game.user_ratings.length,'=',total/game.user_ratings.length)
            game.overallRating=(total/game.user_ratings.length).toFixed(1)
        } else {
            game.overallRating=0;
        }
        await game.save()
    })
}

updateOverallRatings()

// comment
/*************************** ROUTES ***************************/

// All Games Page
router.get('/', asyncHandler(async (req, res) => {
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

const ratingExists = () => {
    const error = new Error(`Review for game with ${id} already exists`);
    error.title = "Ratings already exists";
    error.status = 400;
    return error;
}


// Variable for Date Change
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Specific Games Page
router.get('/:id(\\d+)', csrfProtection, asyncHandler(async (req, res, next) => {
    // Defines variables
    const gameId = req.params.id

    // Finds game with the above id
    const game = await Game.findByPk(gameId, { include: [{ model: User, as: 'user_ratings' }] });

    // const reviews = await Review.findAll({where:{gameId}});
    // const ratings = await Rating.findall({where:{gameId}});


    if(game) {
        // Makes rating array to populate
        const { user_ratings:users } = game
        const releaseDate = `${months[game.releaseDate.getMonth()]} ${game.releaseDate.getDate()}, ${game.releaseDate.getFullYear()}`
        // res.json(game)
        // Renders game page with specific game info
        res.render('game', {title:game.title, game, releaseDate, users, csrfToken:req.csrfToken()});
    } else {
        // Throws error if tweet not found
        next(gameNotFoundError(gameId));
    }
}))


// Create review or rating on game
router.post('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    // Defines variables
    const gameId = req.params.id
    const userId = 1;
    const { overall, body } = req.body

    let rating = await Rating.findOne({ where: { gameId, userId } })

    if (rating) {
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
        const game = await Game.findByPk(gameId, { include: [{ model: User, as: 'user_ratings' }] });
        const { user_ratings } = game;

        // Sends response with review, and reviews
        res.json({ game });
    }

}))


// Edit review or rating on game
router.put('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    // Defines variables
    const gameId = req.params.id
    const userId = 1;
    const { overall, body } = req.body

    // Creates rating instance with above variables
    let rating = await Rating.findOne({ where: { gameId, userId } })

    if (rating) {
        rating.overall = overall
        rating.body = body

        await rating.save()

        res.json({ overall, body })

    } else {
        next(gameNotFoundError(gameId))
    }

}))


// Delete review or rating on game
router.delete('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    // Defines variables
    const gameId = req.params.id
    const userId = 1;

    // Creates rating instance with above variables
    let rating = await Rating.findOne({ where: { gameId, userId } })

    if (rating) {
        await rating.destroy()
        res.status(204).end()

    } else {
        next(gameNotFoundError(gameId))
    }

}))



/*************************** EXPORTS ***************************/
module.exports = router;
