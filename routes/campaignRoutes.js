const express = require('express');
const campaign = express.Router();
var mongoose = require('mongoose');
var {Campaign} = require('../models/campaigns');
var campaignController = require('../controllers/campaigncontroller')

mongoose.Promise = Promise;
//mongoose.set('debug', true);
var bodyParser = require('body-parser');

campaign.use(bodyParser.urlencoded( { extended: false }));


//campaign.get('/', function(req, res) { console.log(req.sessionID); res.send("campaign blahdiblah");})

//campaign.get('/campaignlist', function(req,res) {console.log(res); res.render('campaignlist')})

campaign.get('/campaignlist', campaignController.campaignlist);

campaign.get('/create', campaignController.createget);

campaign.post('/create', campaignController.createpost);

campaign.get('/update', campaignController.updateget);

campaign.post('/update', campaignController.updatepost);

campaign.get('/delete', campaignController.delete);

campaign.get('/wait', function(req, res) { res.render('CAVIWait');})

//cavi.get('/campaign/listinterviewees', function (req, res) {console.log("interviewer list")})

//cavi.


module.exports = campaign;