var express = require('express');
const app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var {User} = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
var util = require('util');
var passportauth = require('../config/passport');

router.use(bodyParser.urlencoded( { extended: false }))

var userRoutes = require('./userRoutes');


router.get('/', function(req, res) {
    console.log(req.sessionID);
    res.send("blahdiblah");
})

router.get('/dostuff', function (req, res) {
    console.log("inside the page callback function")
    console.log(req.sessionID);
    res.send("somestuff");
})

router.get('/login', function (req, res) {   res.render('login');})

router.get('/success', (req, res) => res.send("Welcome "+req.query.username+"!!"));
router.get('/error', (req, res) => res.send("error logging in"));

router.use('/user', userRoutes);


router.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login' } ),
    function(req, res) {
    res.redirect('/authrequired');
});

router.get('/authrequired', (req, res) => {
    console.log('inside authenticated page')
    if(req.isAuthenticated()) {
        res.send('you are authenticated')
        } else {
            console.log('not autehenticated');
            res.redirect('/login');
        }
})

module.exports = router;
