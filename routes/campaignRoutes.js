const express = require('express');
const campaign = express.Router();
var mongoose = require('mongoose');


mongoose.Promise = Promise;
//mongoose.set('debug', true);
var bodyParser = require('body-parser');

campaign.use(bodyParser.urlencoded( { extended: false }));


campaign.get('/', function(req, res) { console.log(req.sessionID); res.send("campaign blahdiblah");})

campaign.get('/campaignlist', function(req,res) {console.log('campaignlist here'); res.render('campaignlist')})

campaign.get('/wait', function(req, res) { res.render('CAVIWait');})

//cavi.get('/campaign/listinterviewees', function (req, res) {console.log("interviewer list")})

//cavi.


module.exports = campaign;