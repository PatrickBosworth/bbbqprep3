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

//define path to routes
var userRoutes = require('./userRoutes');
var caviRoutes = require('./caviRoutes');

//route path for testing.
router.get('/', function(req, res) { console.log(req.sessionID); res.send("blahdiblah");})

//router.get('/success', (req, res) => res.send("Welcome "+req.query.username+"!!"));
 router.get('/error', (req, res) => res.send("error logging in"));


//this is the authenticated user section.
router.use('/user', passport.authcheck, passport.admincheck, userRoutes);

//this is the authenticated cavi section.
router.use('/cavi', passport.authcheck, caviRoutes);

//all the  login routes. should probably be relocated under /auth at some point to keep this file neater.

router.get('/login', function (req, res) {   res.render('login');})

router.get('/logout', function (req, res){
    req.session.destroy(function (err) {
      res.redirect('/login'); //Inside a callback… bulletproof!
    });
  });

router.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login' } ),
    function(req, res) {
    res.redirect('/authrequired');
});

router.get('/authrequired', passportauth.authcheck, (req, res) => { res.redirect('/user/userlist')})

module.exports = router;
