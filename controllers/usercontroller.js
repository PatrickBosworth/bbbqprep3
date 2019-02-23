const express = require('express');
const users = express.Router();
var userController = require('../controllers/usercontroller');
var mongoose = require('mongoose');
var {User} = require('../models/user');
var encrypt = require('../bcrypt/bcrypt');




 var user = {};

 //Get list of all users
user.userlist = function (req, res) {  
    User.find()
        .then((userlist) => {
          res.render('userlist', {title: "Registrations List", userlist})
           })
        .catch(() => {
            res.send("Sorry, no users!");
        }) 
    
    }

// get form for creation of new user
user.createget = function (req, res) {
    res.render('newuser');
}

// post new user
user.createpost = function (req, res) {
    var user = new User({
        username: req.body.username,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        password: encrypt.encryptpassword(req.body.password),
        organisation: req.body.organisation,
        userid: req.body.userid
    })

    //user.password = encrypt.encryptpassword(user.password)
    user.save().then((doc)=> {
        res.redirect('/user/userlist');
    }, (e) => {
        res.status(400).send(e);
    })
}

//get a specific user from the db
user.updateget = function (req,res) {
    User.findOne({userid: req.query.id}, (err, userdetails) => { 
        if (err) {
            res.render('error', {})
        } else {
           res.render('edituser', {userdetails});
            }
        });    
}

user.updatepost = function (req,res) {
    User.findOneAndUpdate({userid: req.body.userid}, {
        $set: {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            organisation: req.body.organisation,
            password: encrypt.encryptpassword(req.body.password)            
        }
    }, (err, result) => {
        if (err) { return res.send(err) }
        else {
        res.redirect('/user/userlist')
        }
    })
}

user.delete = function (req, res) {
    User.findOneAndDelete({userid: req.query.id}, (err, userdetails) => {
        if (err) {
            res.render('error', {})
        } else {
        res.redirect('/user/userlist')
        }
    })
}


module.exports = user;