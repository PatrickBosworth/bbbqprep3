const express = require('express');
const cavi = express.Router();
var mongoose = require('mongoose');

mongoose.Promise = Promise;
//mongoose.set('debug', true);
var bodyParser = require('body-parser');

cavi.use(bodyParser.urlencoded( { extended: false }));


cavi.get('/', function(req, res) { console.log(req.sessionID); res.send("blahdiblah");})



module.exports = cavi;