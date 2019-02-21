var express = require('express');
var app = express();
var util = require('util');
const path = require('path');
const routes = require('./routes/index')
var {mongoose} = require('./db/mongoose');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');


//require('./config/passport')(passport);

// use Pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// set static directory
app.use(express.static(path.join(__dirname, 'public')));


app.use(require('express-session')({
    secret : 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());


// var User = require('./models/user');
// passport.use(new LocalStrategy(passport.authenticate()));
// passport.serializeUser(passport.serializeUser());
// passport.deserializeUser(passport.deserializeUser());

app.use('/', routes);



app.listen(3000, () => {
    console.log('express started on port 3000');
});