const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

//const Users = mongoose.model('Users');
var {User} = require('../models/user');

passport.use(new LocalStrategy({
  username: 'username',
  password: 'password',
}, (email, password, done) => {
  User.findOne({ username })
    .then((user) => {
      if(!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }

      return done(null, user);
    }).catch(done);
}));

module.exports = passport