/*************************** REQUIRES ***************************/
const express = require("express");
const csrf = require('csurf');
const cookieParser = require("cookie-parser");
const db = require('../db/models');
const { loginReq, asyncHandler } = require('../utils');

/*************************** ROUTER SETUP ***************************/
const router = express.Router();

/*************************** MIDDLEWARE ***************************/
// router.use(loginReq())
// router.use(cookieParser())
/*************************** ROUTES ***************************/
// /mygames/ get all mygames

router.get('/:userId(\\d+)',
  asyncHandler(async (req, res) => {
    const games = await db.My_game.findAll()
    res.json({games})
    // res.render('mygames', {games, csrfToken: req.csrfToken()})
}));
// /mygames/ fetch for shelves
router.get('/:userId(\\d+)/libraries',
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10)
    const libraries = await db.Library.findAll({
        where: {
            userId: userId
        }
    })
    res.json({libraries})
    // res.render('libraries', {libraries, csrfToken: csrfToken()})
}));

// /mygames/ post,delete,put

// add to overall mygames list
router.post('/:userId(\\d+)/:gameId(\\d+)/add',
  asyncHandler(async (req, res) => {
    const gameId = parseInt(req.params.gameId, 10);
    const userId = parseInt(req.params.userId, 10);
    const exists = await db.My_game.findOne({
        where: {
            gameId: gameId,
            userId: userId
        }
    })

    if (exists) {
        res.json({exists})
        // res.redirect('/:userId(\\d+)')
        return
    }

    let { played } = req.body;
    // const game = await db.Game.findByPk(gameId);
    if (!played) {
        played = 0;
    }
    
    const mygame = await db.My_game.create({played, userId, gameId});
    res.json({ mygame });
    // res.redirect('/:userId(\\d+)');
}));

// add a library
router.post('/:userId(\\d+)/libraries/add',
  asyncHandler(async (req, res) => {
      const userId = parseInt(req.params.userId, 10);
      const { name } = req.body

      const library = await db.Library.create({name, userId});
      res.json({ library })
    //   res.redirect('/:userId(\\d+)/libraries');
  }));

  // add a game to a library
router.post('/:userId(\\d+)/libraries/:libraryId(\\d+)/:gameId(\\d+)/add', 
  asyncHandler(async (req, res) => {
        // const userId = parseInt(req.params.userId, 10);
    const libraryId = parseInt(req.params.libraryId, 10);
    const gameId = parseInt(req.params.gameId, 10);
    const exists = await db.Library_game.findOne({
        where: {
            gameId: gameId,
            libraryId: libraryId
        }
    })
    // console.log(exists)
    if (exists) {
        res.json({exists})
        return
    }
    
    const libraryGame = await db.Library_game.create({libraryId, gameId});
      res.json({ libraryGame });
    // res.redirect('/:userId(\\d+)/libraries/:libraryId(\\+)');
}));

// change played status
router.put('/:userId(\\d+)/:gameId(\\d+)/played',
  asyncHandler(async (req, res) => {
      const gameId = parseInt(req.params.gameId, 10);
      const mygame = await db.My_game.findOne(
          {
              where: {
                  gameId: gameId
                }
            })
            const { played } = req.body
            console.log(mygame)

    const newPlayed = await mygame.update({ played })
      res.json({ newPlayed });
    // res.redirect('/:userId(\\d+)')
}));

// remove game from mygames
router.delete('/:userId(\\d+)/:gameId(\\d+)/delete',
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const gameId = parseInt(req.params.gameId, 10)
    const mygame = await db.My_game.findOne({
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
  asyncHandler(async (req, res) => {
    const libraryId = parseInt(req.params.libraryId, 10);
    const gameId = parseInt(req.params.gameId, 10)
    const mygame = await db.Library_game.findOne({
        where: {
            gameId: gameId,
            libraryId: libraryId
        }
    })

    mygame.destroy();
    res.status(204).end();
}))

// remove library
router.delete('/:userId(\\d+)/libraries/:libraryId(\\d+)/delete',
  asyncHandler(async (req, res) => {
    const libraryId = parseInt(req.params.libraryId, 10);
    const userId = parseInt(req.params.userId, 10);
    const library = await db.Library.findOne({
        where: {
            userId: userId,
            id: libraryId
        }
    })
    library.destroy();
    res.status(204).end();
  }))

/*************************** EXPORTS ***************************/
module.exports = router;
