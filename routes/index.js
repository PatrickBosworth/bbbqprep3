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
var io = require('socket.io');

router.use(bodyParser.urlencoded( { extended: false }))

//define path to routes
var userRoutes = require('./userRoutes');
var caviRoutes = require('./caviRoutes');
var campaignRoutes = require('./campaignRoutes');

//route path for testing.
router.get('/', function(req, res) { console.log(req.sessionID); res.send("blahdiblah");})

//more testing
router.get('/atest', (req, res) => {
  console.log(req.sessionID)
  res.send("more blah")
})

//router.get('/success', (req, res) => res.send("Welcome "+req.query.username+"!!"));
 router.get('/error', (req, res) => res.send("error logging in"));


//this is the authenticated user section.
router.use('/user', passport.authcheck, passport.admincheck, userRoutes);

//this is the authenticated cavi section.
router.use('/cavi', passport.authcheck, caviRoutes);

//this is the authenticated campaign section - for admin users.
router.use('/campaign', passport.authcheck, passport.admincheck, campaignRoutes);

//all the  login routes. should probably be relocated under /auth at some point to keep this file neater.

router.get('/authfailed', function(req,res) { res.render('authfailed');}) 

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
