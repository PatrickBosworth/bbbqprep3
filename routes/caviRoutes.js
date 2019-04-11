const express = require('express');
var app = express();
var http = require('http').Server(app);
const cavi = express.Router();
var mongoose = require('mongoose');
var io = require ('socket.io')(http);
//app.set('socketio', io);

var waitingAgents = [];

mongoose.Promise = Promise;
//mongoose.set('debug', true);
var bodyParser = require('body-parser');

var goodstuff = "goodstuff"

cavi.use(bodyParser.urlencoded( { extended: false }));


    
cavi.get('/', function(req, res, next) { 
    console.log("session id is " + req.sessionID); 
    waitingAgents.push(req.sessionID);
   // var io = app.get('socketio');
    console.log(waitingAgents)

    res.render("CAVIwait2");
   
})

// io.on('connection', function(socket) {
//      console.log("a user connected to a socket")
        
 

cavi.get('/wait', function(req, res) { res.render('CAVIWait2');})

cavi.get('/register', function(req, res) {
    let recordid = req.query.recordid
    console.log(recordid);
    res.send("all good here");
});










module.exports = cavi;