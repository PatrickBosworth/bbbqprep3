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

passport.use(new LocalStrategy({passReqToCallback: true},
  function(req, username, password,  done) {
       console.log(req.body.orgname);
       console.log(req.body.password);
      User.findOne({ username: username }, function(err, user) { if (err) {return done(err); }
        if (!user) { return done(null, false); }
        //console.log(user);
        if (req.body.orgname != user.organisation) { return done(null, false); }
        if (!bcrypt.compareSync(password, user.password)) { return done(null, false); }
        return done(null, user);
      });
  }
));

passport.authcheck = function (req, res, next) {
  if (req.isAuthenticated()) {
    console.log( req.user.organisation );
    // need to put the check for administrator priveliges in here too
    // check for admin priveliges!!!!
    if (req.user.adminUser === true) {console.log("admin user")}  else { console.log("not an admin user");  return res.redirect('/error'); }
    //
    return next();
  }

}

module.exports = passport