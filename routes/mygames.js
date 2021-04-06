/*************************** REQUIRES ***************************/
const express = require("express");
// const csrf = require('csurf');
const cookieParser = require("cookie-parser");
const db = require('../db/models');
const { csrfProtection, asyncHandler, loginReq } = require("../utils");
/*************************** ROUTER SETUP ***************************/
const router = express.Router();

/*************************** MIDDLEWARE ***************************/
// router.use(loginReq())
router.use(cookieParser())
/*************************** ROUTES ***************************/
// /mygames/ get all mygames
router.get('/:userId(\\d+)', csrfProtection,
  asyncHandler(async (req, res) => {
    const games = await db.My_games.find()
    res.json({games})
    // res.render('mygames', {games, csrfToken: req.csrfToken()})
}));
// /mygames/ fetch for shelves
router.get('/:userId(\\d+)/libraries', csrfProtection,
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10)
    const libraries = await db.Libraries.findall({
        where: {
            userId: userId
        }
    })
    res.json({libraries})
    // res.render('libraries', {libraries, csrfToken: csrfToken()})
}));
// /mygames/ post,delete,put

// add to overall mygames list
router.post('/:userId(\\d+)/:gameId(\\d+)/add', csrfProtection,
  asyncHandler(async (req, res) => {
    const gameId = parseInt(req.params.gameId, 10);
    const userId = parseInt(req.params.userId, 10);
    let gameStatus = req.body.played;
    // const game = await db.Game.findByPk(gameId);
    if (!gameStatus) {
        gameStatus = 0
    }
    
    const mygame = await db.My_games.create({gameStatus, userId, gameId});
    res.jason({mygame})
    // res.redirect('/mygames/:userId(\\d+)');
}));

// add a library
router.post('/:userId(\\d+)/libraries/add',
  asyncHandler(async (req, res) => {
      console.log("hi")
      const userId = parseInt(req.params.userId, 10);
      const { name } = req.body

      const library = await db.Library.create({name, userId});
      res.json({ library })
    //   res.redirect('/mygames/:userId(\\d+)/libraries');
  }));

  // add a game to a library
router.post('/:userId(\\d+)/libraries/:libraryId(\\+)/gameId(\\+)/add', csrfProtection, 
  asyncHandler(async (req, res) => {
        // const userId = parseInt(req.params.userId, 10);
    const libraryId = parseInt(req.params.libraryId, 10);
    const gameId = parseInt(req.params.gameId, 10);

    const libraryGame = await Library_game.create({libraryId, gameId});
      res.json({ libraryGame })
    // res.redirect('/mygames/:userId(\\d+)/libraries/:libraryId(\\+)');
}));

// change played status
router.put('/:gameId(\\d+)', csrfProtection, 
  asyncHandler(async (req, res) => {
    const gameId = parseInt(req.params.id, 10);
    const mygame = await Mygame.findByPk(gameId)
    const { played } = req.body

    const newPlayed = await mygame.update({ played })
      res.json({ newPlayed })
    // res.redirect('/mygames/:userId(\\d+)')
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
router.delete('/:userId(\\d+)/libraries/:libraryId(\\d+)/:gameId(\\d+)/delete', 
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
