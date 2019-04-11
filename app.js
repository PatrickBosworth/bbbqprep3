var express = require('express');
var session = require('express-session');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var util = require('util');
var bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/index')
var {mongoose} = require('./db/mongoose');
var passport = require('passport')
var uuid = require('uuid/v4');
var morgan = require('morgan');
var LocalStrategy = require('passport-local').Strategy;
//var flash = require('connect-flash');

var fileUpload = require('express-fileupload');

//require and configure session database config
var MongoDBStore = require('connect-mongodb-session')(session);
var sessiondbconf = require('./config/sessionStoreDBConfig');


// use Pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//set socketio as a retrieveable parameter
//app.set('socektio', io);
io.on('connection', function(socket) {
    console.log("a user connected to a socket " + socket)
    socket.on('getcall',(socket)=> {
        console.log("this is the socket stuff " + socket);
    })

})



// set static directory
app.use(express.static(path.join(__dirname, 'public')));

//enable morgan logging
//app.use(morgan('combined'));

//allow fileuploading
app.use(fileUpload());

//express.session must be enabled
app.use(session({
    genid: (req) => { 
        //console.log("inside the session middleware")
        //console.log(req.sessionID);
        console.log("session is " );
        return uuid();
    },
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    store: sessiondbconf.store
}));
app.use(express.urlencoded({ extended: true })); // express body-parser


app.use(passport.initialize());
app.use(passport.session());
// app.use(flash());





app.use('/', routes);



http.listen(3000, () => {
    console.log('express started on port 3000');
});