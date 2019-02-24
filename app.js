var express = require('express');
var session = require('express-session');
const fileStore = require('session-file-store')(session);
var app = express();
var util = require('util');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const path = require('path');
const routes = require('./routes/index')
var {mongoose} = require('./db/mongoose');
var passport = require('passport')
var uuid = require('uuid/v4');
var morgan = require('morgan');
//var LocalStrategy = require('passport-local').Strategy;
//var flash = require('connect-flash');


//require('./config/passport')(passport);

// use Pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// set static directory
app.use(express.static(path.join(__dirname, 'public')));

//enable morgan logging
//app.use(morgan('combined'));

//enable body parser and cookie parser
app.use(cookieParser);
app.use(bodyParser.urlencoded({ extended: true}));

//express.session must be enabled
app.use(session({
    genid: (req) => { 
        console.log("inside the session middleware")
        console.log(req.sessionID);
        return uuid();
    },
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
    store: new fileStore()
}));
app.use(express.urlencoded({ extended: true })); // express body-parser


app.use(passport.initialize());
app.use(passport.session());
// app.use(flash());


// var User = require('./models/user');
// passport.use(new LocalStrategy(passport.authenticate()));
// passport.serializeUser(passport.serializeUser());
// passport.deserializeUser(passport.deserializeUser());

app.use('/', routes);



app.listen(3000, () => {
    console.log('express started on port 3000');
});