/*************************** REQUIRES ***************************/
const express = require("express");
const { check, validationResult } = require("express-validator");
const { Op } = require("sequelize");

const { Game, Console, Rating, User, Library } = require("../db/models")
/*************************** ROUTER SETUP ***************************/
const router = express.Router();

/*************************** MIDDLEWARE ***************************/
const {
    csrfProtection,
    asyncHandler,
    handleValidationErrors,
} = require("../utils.js");

const validateRating = [
    check('overall')
        .exists({checkFalsy: true})
        .withMessage('Must provide a rating!')
]


/*************************** FUNCTIONS ***************************/
// const updateOverallRatings = async()=>{
//     const games = await Game.findAll({include:[{model:User, as:'user_ratings'}]});
//     games.forEach(async(game)=>{
//         let total = 0;

//         game.user_ratings.forEach((user)=>{
//           total+=parseInt(user.Rating.overall)
//         })

//         if(total){game.overallRating=(total/game.user_ratings.length).toFixed(1);}
//         else {game.overallRating=0;};

//         await game.save()
//     })
// }

// updateOverallRatings()

// comment
/*************************** ROUTES ***************************/

// All Games Page
router.get('/', asyncHandler(async (req, res) => {
    // Finds all games from the database
    const games = await Game.findAll();
    const consoles = await Console.findAll()

    // Renders games page with list of all games from A-Z
    res.render("allgames", { title: "All Games", games, consoles });
}));

router.get('/api/:filter', asyncHandler(async (req, res) => {
    const filterType = req.params.filter
    console.log(filterType)

    if(filterType.match(/\d/g)){
        const min=parseInt(filterType)
        const games = await Game.findAll({
            where:{
                overallRating: {
                    [Op.gte]:min
                }
            },
            limit:24
        })
        res.json({games})
    } else {
        const consoleType=filterType
        const games = await Game.findAll({
            include:{
                model:Console,
            },
            limit:24
        })
        res.json({success:'success'})
    }
})
);

// Game Not Found FUNCTION
const gameNotFoundError = (id) => {
    const error = new Error(`Game with ${id} could not be found`);
    error.title = "Game not found";
    error.status = 404;
    return error;
};

const ratingExists = (id) =>{
    const error = new Error(`Rating for game with ${id} already exists`);
    error.title = "Ratings already exists";
    error.status = 400;
    throw error;
}


// Variable for Date Change
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Specific Games Page
router.get('/:id(\\d+)', csrfProtection, asyncHandler(async(req,res,next)=>{

    const gameId = req.params.id
    const userId = 1;

    let game = await Game.findByPk(gameId,{include:[{ model:User, as: "user_ratings"},{ model:Library, as: "library_games"}]})

    if(game) {
        let libraries;

        const { user_ratings:users } = game

        const { library_games:libraryUsers} = game

        if(libraryUsers.length!==0){
            let libraryUser=libraryUsers.filter((user)=>{
                return user.id=userId
            })[0]
            libraries = libraryUser.Library
        } else {
            libraries = null
        }
        // Makes rating array to populate
        const releaseDate = `${months[game.releaseDate.getMonth()]} ${game.releaseDate.getDate()}, ${game.releaseDate.getFullYear()}`

        // Renders game page with specific game info6
        res.render('game', {title:game.title, game, releaseDate, users, userId, req, csrfToken:req.csrfToken()});
    } else {
        // Throws error if tweet not found
        next(gameNotFoundError(gameId));
    }
}))

router.get('/:id(\\d+)/api', csrfProtection, asyncHandler(async(req,res,next)=>{

    const gameId = req.params.id
    const userId = 1;

    const rating = await Rating.findOne({where:{gameId, userId}})

    if(rating){
        const user = await User.findByPk(userId)
        const {userName:username}=user
        const {overall, body} = rating
        res.json({rating, username})
    } else {
        res.status(400).send({message:'Rating not found'})
    }

}))


// Create review or rating on game
router.post('/:id(\\d+)', validateRating, asyncHandler(async(req,res,next)=>{
    // Defines variables

    const validationErrors = validationResult(req)

    if(!validationErrors.isEmpty()){
        const errors = validationErrors.array().map((error)=>error.msg)
        res.status(500).send({errors})
        return
    }

    const gameId = req.params.id
    const userId = 1;

    let rating = await Rating.findOne({ where: { gameId, userId } })

    if (rating) {
        next(ratingExists(gameId))
    } else {
        const { overall, body } = req.body
        // Creates review instance with above variables
        rating = await Rating.create({
            overall,
            body,
            userId,
            gameId
        });

        // let user = await User.findByPk(userId)

        const game = await Game.findByPk(gameId,{include:[{ model:User, as: "user_ratings", }]})
        const { user_ratings:users } = game

        let [user] = users.filter((user)=>{
            return user.id=userId
        })

        game.overallRating = ((game.overallRating*(users.length-1)+overall)/users.length).toFixed(1)

        await game.save();

        // Sends response with review, and reviews
        res.json({rating, username:user.userName, overallRating:game.overallRating});
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

        const game = await Game.findByPk(gameId,{include:[{ model:User, as: "user_ratings", }]})
        const { user_ratings:users } = game

        let [user] = users.filter((user)=>{
            return user.id=userId
        })

        game.overallRating = ((game.overallRating*(users.length-1)+overall)/users.length).toFixed(1)
        await game.save();

        res.json({rating, username:user.userName, overallRating:game.overallRating});

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

        const game = await Game.findByPk(gameId,{include:[{ model:User, as: "user_ratings", }]})
        const { user_ratings:users } = game

        game.overallRating = ((game.overallRating*users.length-rating.overall)/(users.length-1)).toFixed(1)
        await game.save();

        await rating.destroy()
        res.json({overallRating:game.overallRating})

    } else {
        next(gameNotFoundError(gameId))
    }

}))



/*************************** EXPORTS ***************************/
module.exports = router;
