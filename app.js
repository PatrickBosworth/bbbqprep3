var express = require('express');
var session = require('express-session');
var app = express();
//var http = require('http').Server(app);
//var io = require('socket.io')(http);
const server = require('http').createServer(app);
const io = require('./socket.js').init(server);
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
var {Session} = require('./models/sessions')
var sharedsession = require("express-socket.io-session");


var fileUpload = require('express-fileupload');

//require and configure session database config
var MongoDBStore = require('connect-mongodb-session')(session);
var sessiondbconf = require('./config/sessionStoreDBConfig');


// use Pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//store socket.io
app.set('socketio', io);

console.log("socketio here: " +app.get('socketio'));


// set static directory
app.use(express.static(path.join(__dirname, 'public')));

//enable morgan logging
//app.use(morgan('combined'));

//allow fileuploading
app.use(fileUpload());

//define sesssion parameters
var session = require('express-session')({
    genid: (req) => { 
        //console.log("inside the session middleware")
        //console.log(req.sessionID);
      //  console.log("session is " );
        return uuid();
    },
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000000 },
    store: sessiondbconf.store
})

//express.session must be enabled
app.use(session);



io.use(sharedsession(session));

io.on('connection', function(socket) {
   // console.log("a user connected to a socket " + util.inspect(socket.handshake.session))

    socket.on('getcall',()=> {
        console.log("we received a message from " + socket.handshake.session.username + " on session " + socket.handshake.sessionID + " and socket " + socket.id);
        socket.handshake.session.userdata = "blah";
        socket.handshake.session.socketid = socket.id;
        socket.handshake.session.save();
       // console.log("we received a message from " + socket.handshake.socketid);
    //   io.to(socket.id).emit("message", "what ho!");
       io.sockets.connected[socket.id].emit("message", "what ho!" + socket.handshake.session.username);

    })

})





app.use(express.urlencoded({ extended: true })); // express body-parser


app.use(passport.initialize());
app.use(passport.session());
// app.use(flash());





app.use('/', routes);



server.listen(3000, () => {
    console.log('express started on port 3000');
});