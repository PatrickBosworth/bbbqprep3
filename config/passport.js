//const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt-nodejs');

//const Users = mongoose.model('Users');
var {User} = require('../models/user');



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
      User.findOne({ username: username }, function(err, user) { if (err) {return done(err); }
        if (!user) { return done(null, false); }
        if (!bcrypt.compareSync(password, user.password))
        // if (user.password != password) 
        { return done(null, false); }
        return done(null, user);
      });
  }
));



module.exports = passport