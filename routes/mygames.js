/*************************** REQUIRES ***************************/
const express = require("express");
const csrf = require('csurf');
const db = require('../db/models');
const { loginReq } = require("../utils");
/*************************** ROUTER SETUP ***************************/
const router = express.Router();

/*************************** MIDDLEWARE ***************************/
const csrfProtection = csrf({cookie: true})
router.use(loginReq())
/*************************** ROUTES ***************************/
// /mygames/ get all mygames
router.get('/mygames', csrfProtection, async (req, res) => {
    const games = await db.my_games.findAll()
    res.render('mygames', {games, csrfToken: req.csrfToken()})
});
// /mygames/ fetch for shelves
router.get('/mygames/libraries', csrfProtection, async (req, res) => {
    const libraries = await db.libraries.findall()
    res.render('libraries', {libraries, csrfToken: csrfToken()})
})
// /mygames/ post,delete,put
router.post('/mygames', csrfProtection, async (req, res) => {
    const game = 
})

/*************************** EXPORTS ***************************/
module.exports = router;
