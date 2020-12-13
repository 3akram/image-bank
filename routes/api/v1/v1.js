const express = require('express'),
    passport = require('passport');


const router = express.Router();

/*
 * desc   : Test v1 endpoint
 * access : Public
 * method : GET
 * route  : /api/v1/
 */
router.get('/test', (req, res) => {
    res.send('api v1 works');
})

/*
 * desc   : Test Api Authorization
 * access : Private
 * method : GET
 * route  : /api/v1/test-authority
 */

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(req.user);
}) 

module.exports = router;
