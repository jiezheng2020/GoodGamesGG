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
const updateOverallRatings = async()=>{
    const games = await Game.findAll({include:[{model:User, as:'user_ratings'}]});
    games.forEach(async(game)=>{
        let total = 0;

        game.user_ratings.forEach((user)=>{
          total+=parseInt(user.Rating.overall)
        })

        if(total){
            game.overallRating=(total/game.user_ratings.length).toFixed(1);
            if(game.overallRating>5){game.overallRating=5}
        }else {
            game.overallRating=0;
        };

        await game.save()
    })
}

updateOverallRatings()

/*************************** NOT FOUND FUNCTIONS ***************************/
// Game Not Found FUNCTION
const gameNotFoundError = (id) => {
    const error = new Error(`Game with ${id} could not be found`);
    error.title = "Game not found";
    error.status = 404;
    return error;
};

// Rating Exists FUNCTION
const ratingExists = (id) =>{
    const error = new Error(`Rating for game with ${id} already exists`);
    error.title = "Ratings already exists";
    error.status = 400;
    throw error;
}


/*************************** ROUTES ***************************/
const limit=12;

// All Games Page Route
router.get('/', asyncHandler(async (req, res) => {
    // Finds all games from the database
    const games = await Game.findAll({
        order:[['overallRating','DESC']],
    });
    const pageNum = Math.ceil(games.length/limit);
    const consoles = await Console.findAll()


    // Renders games page with list of all games from A-Z
    res.render("allgames", { title: "All Games", games:games.slice(0,limit), consoles, pageNum, req});
}));



// Api GET Route For Games List
router.post('/api', asyncHandler(async (req, res) => {
    const {filter, orderType, pageNum}=req.body

    if(filter.match(/^\d/g)){
        const min=parseInt(filter)
        const games = await Game.findAll({
            where:{
                overallRating: {
                    [Op.gte]:min
                }
            },
            order:[[orderType,'DESC']]
        })
        res.json({games})

    } else if(filter==='all'){
        const games = await Game.findAll({
            order:[[orderType,'DESC']]
        });
        res.json({games})

    } else {
        const consoleType=filter
        const games = await Game.findAll({
            include:{
                model:Console,
                as: 'game_consoles',
                where: {
                    name:consoleType
                }
            },
            order:[[orderType,'DESC']]
        })
        res.json({games})

    }
})
);

const pStats = {
    2: 'Played',
    1: 'Currently Playing',
    0: 'Want to Play'
}

// Single Game Page Route
router.get('/:id(\\d+)', asyncHandler(async(req,res,next)=>{

    const gameId = req.params.id

    let game = await Game.findByPk(gameId,{include:[{ model:User, as: "user_ratings"},{ model:Console, as: "game_consoles"}]})
    let consoles = game.game_consoles.map(con=>con.name).join(', ')

    if(game) {

        const { user_ratings:userReviews } = game

        let libraries=null;
        let user=null;
        let playedStatus = null;

        if(req.session.user){

            user = req.session.user;
            let {Libraries} = await User.findByPk(user.id,{include:[{model:Library}]})
            let {user_mygames:[userMyGame]} = await Game.findByPk(gameId,{include:[{ model:User, as: "user_mygames"}]})
            playedStatus = (userMyGame) ? pStats[userMyGame.My_game.played] : undefined;
            libraries = Libraries
        }

        // Array of month's for date conversion
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


        // Makes rating array to populate
        const releaseDate = `${months[game.releaseDate.getMonth()]} ${game.releaseDate.getDate()+1}, ${game.releaseDate.getFullYear()}`

        // Renders game page with specific game info
        res.render('game', {title:game.title, game, releaseDate, consoles, userReviews, playedStatus, user, libraries, req});
    } else {
        // Throws error if tweet not found
        next(gameNotFoundError(gameId));
    }
}))


// API Get Route For A User's Game Rating
router.get('/:id(\\d+)/api', asyncHandler(async(req,res,next)=>{

    const gameId = req.params.id
    let userId=null;
    if(req.session.user){
        const {id} = req.session.user;
        userId=id
    }

    const rating = await Rating.findOne({where:{gameId, userId}})


    if(rating){
        const user = await User.findByPk(userId)
        const {userName:username}=user
        const {overall, body} = rating
        res.json({exists: true, rating, username})
    } else {
        res.status(404).send({message: 'Rating does not exist'})
        // res.json({exists: false, message: 'Rating does not exist'})
    }

}))




// API Post Route To CREATE A Rating/Review
router.post('/:id(\\d+)', validateRating, asyncHandler(async(req,res,next)=>{
    // Defines variables

    const validationErrors = validationResult(req)

    if(!validationErrors.isEmpty()){
        const errors = validationErrors.array().map((error)=>error.msg)
        res.status(500).send({errors})
        // res.json({validationErrors:errors})
        return
    }

    const gameId = req.params.id
    const {id:userId} = req.session.user;

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

        const game = await Game.findByPk(gameId,{include:[{ model:User, as: "user_ratings", }]})
        const { user_ratings:users } = game

        let [user] = users.filter((user)=>{
            return user.id===userId
        })

        game.overallRating = ((game.overallRating*(users.length-1)+overall)/users.length).toFixed(1)
        if(game.overallRating>5){game.overallRating=5}
        await game.save();

        // Sends response with review, and reviews
        res.json({rating, username:user.userName, overallRating:game.overallRating});
    }

}))


// API Post Route To EDIT A Rating/Review
router.put('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    // Defines variables
    const gameId = req.params.id
    const {id:userId} = req.session.user;
    const { overall, body } = req.body

    // Creates rating instance with above variables
    let rating = await Rating.findOne({ where: { gameId, userId } })

    if (rating) {


        const game = await Game.findByPk(gameId,{include:[{ model:User, as: "user_ratings"}]})
        const { user_ratings:users } = game

        let [user] = users.filter((user)=>{
            return user.id===userId
        })

        game.overallRating = ((game.overallRating*(users.length) - rating.overall + overall)/users.length).toFixed(1)

        if(game.overallRating>5){game.overallRating=5}

        rating.overall = overall
        rating.body = body

        await rating.save()
        await game.save();

        res.json({rating, username:user.userName, overallRating:game.overallRating});

    } else {
        res.status(404).send({message: 'Rating does not exist'})
    }

}))



// API Post Route To DELETE A Rating/Review
router.delete('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    // Defines variables
    const gameId = req.params.id
    const {id:userId} = req.session.user;

    // Creates rating instance with above variables
    let rating = await Rating.findOne({ where: { gameId, userId } })

    if (rating) {

        const game = await Game.findByPk(gameId,{include:[{ model:User, as: "user_ratings", }]})
        const { user_ratings:users } = game

        if(users.length!==1){
            game.overallRating = ((((game.overallRating)*users.length)-rating.overall)/(users.length-1)).toFixed(1)

            if(game.overallRating>5){game.overallRating=5}

        } else {
            game.overallRating = 0;
        }

        await game.save();

        await rating.destroy()
        res.json({overallRating:game.overallRating})

    } else {
        res.status(404).send({message:'Rating doest not exist'})
    }

}))



/*************************** EXPORTS ***************************/
module.exports = router;
