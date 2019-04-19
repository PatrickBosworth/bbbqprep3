const express = require('express');
var app = express();
//var http = require('http').Server(app);
const cavi = express.Router();
var mongoose = require('mongoose');
var {Session} = require('../models/sessions')
var util = require('util');
const io = require('../socket.js').getio();



var waitingAgents = [];

mongoose.Promise = Promise;
//mongoose.set('debug', true);
var bodyParser = require('body-parser');

var goodstuff = "goodstuff"

cavi.use(bodyParser.urlencoded( { extended: false }));


    
cavi.get('/', function(req, res, next) { 
    //console.log("route: session id is " + req.sessionID); 
    waitingAgents.push(req.sessionID);
   // var io = app.get('socketio');
   // console.log(waitingAgents)

    res.render("CAVIwait2");
   
})

io.on('connection', function(socket) {
     console.log("a user connected on socket " + socket.sockets)
})
 

cavi.get('/wait', function(req, res) { res.render('CAVIWait2');})

cavi.get('/register', function(req, res) {
    let recordid = req.query.recordid
    console.log(recordid);
    res.send("all good here");
});



cavi.get('/sendtoclient', function( req, res) {
    let destname = req.query.destname;
    Session.findOne({"session.username": destname})
        .then(function(err, result) {
        if (!result) { res.send("no user")} 
        // console.log(result);
        destsocket =result.session.socketid; 
        //console.log("destsocket: " + destsocket);
        if (destsocket = null) { res.send("no session")
              }else {
            io.to(destsocket).emit("message", "hello there " + result.session.username + " from the cavi route page");
           // console.log("this is the socket I am sending to " + destsocket);
            res.send(util.inspect(io.server));
              }
        })
    .catch (() => {
        res.send("sorry no session");
    })
})


module.exports = cavi;