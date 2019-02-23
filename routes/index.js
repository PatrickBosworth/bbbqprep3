var express = require('express');
const app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var {User} = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
var util = require('util');
//var {passportauth} = require('../config/passport');


app.use(passport.initialize());
app.use(passport.session());

router.use(bodyParser.urlencoded( { extended: false }))

var userRoutes = require('./userRoutes');


router.get('/', function(req, res) {
    res.send("blahdiblah");
})

router.get('/login', function (req, res) {   res.render('login');})

router.get('/success', (req, res) => res.send("Welcome "+req.query.username+"!!"));
router.get('/error', (req, res) => res.send("error logging in"));

router.use('/user', userRoutes);

mongoose.connect("mongodb://localhost:27017/CAVI", {useNewUrlParser: true});


passport.serializeUser(function(user, cb) {
    cb(null, user.id);
})

passport.deserializeUser(function(id, cb){
    User.findById(id, function(err, user) {
        cb(err, user);
    });
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({
          username: username
        }, function(err, user) {
          if (err) {
              console.log(err);
            return done(err);
          }
  
          if (!user) {
              console.log("no user");
            return done(null, false);
          }
  
          if (user.password != password) 
          {
              console.log("wrong password")
            return done(null, false);
          }
          console.log("success");
          return done(null, user);
        });
    }
  ));


  router.post('/login', 
    passport.authenticate('local', { failureRedirect: '/error' } ),

    function(req, res) {

    res.redirect('/success');
});



module.exports = router;
