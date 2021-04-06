/*************************** REQUIRES ***************************/
const express = require("express");
const csrf = require('csurf');
const db = require('../db/models');
const { csrfProtection, asyncHandler, loginReq } = require("../utils");
/*************************** ROUTER SETUP ***************************/
const router = express.Router();

/*************************** MIDDLEWARE ***************************/
// router.use(loginReq())
/*************************** ROUTES ***************************/
// /mygames/ get all mygames
router.get('/mygames/:userId(\\d+)', csrfProtection,
  asyncHandler(async (req, res) => {
    const games = await db.My_games.find()
    res.render('mygames', {games, csrfToken: req.csrfToken()})
}));
// /mygames/ fetch for shelves
router.get('/mygames/:userId(\\d+)/libraries', csrfProtection,
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10)
    const libraries = await db.Libraries.findall({
        where: {
            userId: userId
        }
    })
    res.render('libraries', {libraries, csrfToken: csrfToken()})
}));
// /mygames/ post,delete,put

// add to overall mygames list
router.post('/mygames/:userId(\\d+)/:gameId(\\d+)/add', csrfProtection,
  asyncHandler(async (req, res) => {
    const gameId = parseInt(req.params.gameId, 10);
    const userId = parseInt(req.params.userId, 10);
    let gameStatus = req.body.played;
    // const game = await db.Game.findByPk(gameId);
    if (!gameStatus) {
        gameStatus = 0
    }
    
    const mygame = await db.My_games.create({gameStatus, userId, gameId});
    res.redirect('/mygames/:userId(\\d+)');
}));

// add a library
router.post('mygames/:userId(\\d+)/libraries/add', csrfProtection,
  asyncHandler(async (req, res) => {
      const userId = parsInt(req.params.userId, 10);
      const { name } = req.body

      const library = await Library.create({name, userId});
      res.redirect('/mygames/:userId(\\d+)/libraries');
  }));

  // add a game to a library
router.post('mygames/:userId(\\d+)/libraries/:libraryId(\\+)/gameId(\\+)/add', csrfProtection, 
  asyncHandler(async (req, res) => {
        // const userId = parseInt(req.params.userId, 10);
    const libraryId = parseInt(req.params.libraryId, 10);
    const gameId = parseInt(req.params.gameId, 10);

    const libraryGame = await Library_game.create({libraryId, gameId});
    res.redirect('/mygames/:userId(\\d+)/libraries/:libraryId(\\+)');
}));

// change played status
router.put('/mygames/:gameId(\\d+)', csrfProtection, 
  asyncHandler(async (req, res) => {
    const gameId = parseInt(req.params.id, 10);
    const mygame = await Mygame.findByPk(gameId)
    const { played } = req.body

    const newPlayed = await mygame.update({ played })
    res.redirect('/mygames/:userId(\\d+)')
}));

// remove game from mygames
router.delete('/mygames/:userId(\\d+)/:gameId(\\d+)/delete', csrfProtection,
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const gameId = parseInt(req.params.id, 10)
    const mygame = await My_games.findAll({
        where: {
            gameId: gameId,
            userId: userId
        }
    })

    mygame.destroy()
    res.status(204).end()
}))

// remove game from library
router.delete('/mygames/:userId(\\d+)/libraries/:libraryId(\\d+)/:gameId(\\d+)/delete', 
  csrfProtection, asyncHandler(async (req, res) => {
    const libraryId = parseInt(req.params.id, 10);
    const gameId = parseInt(req.params.id, 10)
    const mygame = await Library_games.findAll({
        where: {
            gameId: gameId,
            libraryId: libraryId
        }
    })

    mygame.destroy();
    res.status(204).end();
}))


/*************************** EXPORTS ***************************/
module.exports = router;
