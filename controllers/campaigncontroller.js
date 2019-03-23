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

campaign.createget = function(req, res) {
    res.render('newcampaign');
};

campaign.createpost = function(req, res) {
    var campaign = new Campaign({
        campaignName: req.body.campaignname,
        campaignDescription: req.body.description,
        organisation: req.user.organisation
    })
    campaign.save().then((doc)=> {
        res.redirect('/campaign/campaignlist');
    }, (e) => { res.status(400).send(e);
    })
};

campaign.updateget = function(req, res) {};

campaign.updatepost = function(req, res) {};

campaign.delete = function(req, res) {};




module.exports = campaign;