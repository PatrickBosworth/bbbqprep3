var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var {User} = require('../models/user');
const passport = require('passport');

router.use(bodyParser.urlencoded( { extended: false }))

var userRoutes = require('./userRoutes');


router.get('/', function(req, res) {
    res.send("blahdiblah");
})

router.get('/login', function (req, res) {   res.render('login');})

router.post('/login', (req, res) => {
   // console.log(req.body.username)
    passport.authenticate('local', {
        successRedirect: '/users/userlist',
        failureRedirect: '/login',
        failureFlash: true
    })
});

router.use('/user', userRoutes);

module.exports = router;