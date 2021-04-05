/*************************** REQUIRES ***************************/
const express = require("express");
const { check, validationResult } = require('express-validator')

const { Game, Review } = require('./models')
/*************************** ROUTER SETUP ***************************/
const router = express.Router();

/*************************** MIDDLEWARE ***************************/
const { asyncHandler, handleValidationErrors } = require('../utils.js')

const validateReview = [
    check('body')
        .isLength({max: 280})
        .withMessage('Tweet cannot be longer than 280 characters')
]


const validateRating = [
    check('overall')
        .exists({checkFalsy: true})
        .withMessage('Message cannot be empty'),
]

/*************************** ROUTES ***************************/

router.get('/', (req,res)=>{
    const games = Game.findAll({order:[['title']]});
    res.render('games', {title: 'All Games', games});
})

router.get('/:id', (req,res)=>{
    const id = req.params.id
    const game = Game.findOne({where:{id}});
    res.render('game', {title:game.title, game});
})

router.post('/:id/reviews', (req,res)=>{
    const id = req.params.id
    const { body } = req.body.body
    const review = Review.build()

})

router.post('/:id/ratings', (req,res)=>{
    const id = req.params.id
    const game = Game.findOne({where:{id}});
    res.render('games', {title: 'Games', games});
})



/*************************** EXPORTS ***************************/
module.exports = router;
