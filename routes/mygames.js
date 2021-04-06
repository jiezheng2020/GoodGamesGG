/*************************** REQUIRES ***************************/
const express = require("express");
const csrf = require("csurf");
const db = require("../db/models");
const { csrfProtection, asyncHandler, loginReq } = require("../utils");
/*************************** ROUTER SETUP ***************************/
const router = express.Router();

/*************************** MIDDLEWARE ***************************/
// router.use(loginReq())
/*************************** ROUTES ***************************/
// /mygames/ get all mygames
router.get(
  "/mygames/:userId(\\d+)",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const games = await db.My_games.find();
    res.render("mygames", { games, csrfToken: req.csrfToken() });
  })
);
// /mygames/ fetch for shelves
router.get(
  "/mygames/:userId(\\d+)/libraries",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const libraries = await db.Libraries.findall({
      where: {
        userId: userId,
      },
    });
    res.render("libraries", { libraries, csrfToken: csrfToken() });
  })
);
// /mygames/ post,delete,put

//add to overall mygames list
router.post('/mygames/:gameId(\\d+)/add', csrfProtection,
  asyncHandler(async (req, res) => {
    const gameId = parseInt(req.params.gameId, 10);
    const game = await db.Game.findByPk(gameId)

    const gameStatus = game.played


    // const game = await db.My_games.create({

    // })
}));

    const gameStatus = game.played;

    const newgame = await db.My_games.create({});
  })
);

/*************************** EXPORTS ***************************/
module.exports = router;
