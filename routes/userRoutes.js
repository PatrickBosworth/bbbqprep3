const express = require('express');
const users = express.Router();
var {User} = require('../models/user');
var userController = require('../controllers/usercontroller');
var mongoose = require('mongoose');

mongoose.Promise = Promise;
//mongoose.set('debug', true);
var bodyParser = require('body-parser');

users.use(bodyParser.urlencoded( { extended: false }));


// get user list
users.get('/userlist', userController.userlist)

  //get form for creating user
users.get('/create', userController.createget);

// post update
users.post('/create', userController.createpost);

//render pug update page
users.get('/update', userController.updateget);

//update details for a specific user
users.post('/update', userController.updatepost);

// delete a specific user
users.get('/delete', userController.delete);

//random stuff here

//some more stuff here to go into remote



module.exports = users;