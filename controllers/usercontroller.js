const express = require('express');
const users = express.Router();
var userController = require('../controllers/usercontroller');
var mongoose = require('mongoose');
var {User} = require('../models/user');


 var user = {};
 
user.userlist = function (req, res) {  
    User.find()
        .then((userlist) => {
          res.render('userlist', {title: "Registrations List", userlist})
           })
        .catch(() => {
            res.send("Sorry, no users!");
        }) 
    
    }





module.exports = user;