const express = require('express');
const users = express.Router();
var userController = require('../controllers/usercontroller');
var mongoose = require('mongoose');
var {Campaign} = require('../models/campaigns');
var encrypt = require('../bcrypt/bcrypt');




 var campaign = {};

 //Get list of all campaigns
campaign.campaignlist = function (req, res) {  
    if (req.user.organisation !== "SU") {
    Campaign.find( { organisation: req.user.organisation })
        .then((campaignlist) => { res.render('campaignlist', {title: "Campaigns List", campaignlist})
        
           })
        .catch(() => {
            res.send("Sorry, no campaigns!");
        }) 
    }
    else
    {
        Campaign.find()
        .then((campaignlist) => { res.render('campaignlist', {title: "Registrations List", campaignlist})
        
           })
        .catch(() => {
            res.send("Sorry, no campaigns!");
        }) 
    }
    }

campaign.create = function(req, res) {};

campaign.delete = function(req, res) {};

campaign.update = function(req, res) {};


module.exports = campaign;