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

// io.on('connection', function(socket) {
//      console.log("a user connected on socket " + util.inspect(socket.handshake.session.socketid));
//     // console.log("the sessions are " + util.inspect(socket.handshake));
// })
 

cavi.get('/wait', function(req, res) { res.render('CAVIWait2');})

cavi.get('/register', function(req, res) {
    let recordid = req.query.recordid
    console.log(recordid);
    res.send("all good here");
});



cavi.get('/sendtoclient', function( req, res) {
    let destname = req.query.destname;
    let destmessage = req.query.destmessage;
    var destsocket
    Session.findOne({"session.username": destname})
        .then(function(result) {
           // console.log("result of query" + result);
            if (!result) { res.send("no user")} 
        
        destsocket = result.session.socketid; 

        console.log("destsocket: " + destsocket);
        if (destsocket == "") { res.send("no session")
              }else {
            console.log("made it to the sending part!")
            console.log("socket to sendto is: " + destsocket + " blah")
          io.sockets.connected[destsocket].emit('message',  "what fucking marvellous! news 1");
          io.sockets.connected[destsocket].emit('init',  destmessage);

          // io.sockets.connected[destsocket].emit('initiate', "what fucking marvellous! news 2");
           // console.log("this is the socket I am sending to " + destsocket);
            res.send(util.inspect("result is " + destsocket));
              }
        })
    .catch ((error) => {
        console.log(error);
        res.send("sorry no session");
    })
})


module.exports = cavi;