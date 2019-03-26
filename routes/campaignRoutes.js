const express = require('express');
const campaign = express.Router();
var mongoose = require('mongoose');
var {Campaign} = require('../models/campaigns');
var campaignController = require('../controllers/campaigncontroller')
var recordController = require('../controllers/recordcontroller')

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

campaign.get('/recordlist', recordController.recordlist);

campaign.post('/recordimport', recordController.recordimport);

campaign.get('/recordcreate', recordController.recordcreateget);

campaign.post('/recordcreate', recordController.recordcreatepost);

campaign.get('/recorddelete', recordController.recorddelete);

//cavi.get('/campaign/listinterviewees', function (req, res) {console.log("interviewer list")})

//cavi.


module.exports = campaign;