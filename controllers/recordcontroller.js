const express = require('express');
const records = express.Router();
var mongoose = require('mongoose');
var {Record} = require('../models/record');
var csv = require('fast-csv');



 var record = {};

 //Get list of all campaigns
record.recordlist = function (req, res) {  
    if (req.user.organisation !== "SU") {
    Record.find( { organisation: req.user.organisation })
        .then((recordlist) => { res.render('recordlist', {title: "Record List", recordlist})
        console.log(recordlist)
           })
        .catch(() => {
            res.send("Sorry, no records!");
        }) 
    }
    else
    {
        Record.find()
        .then((recordlist) => { res.render('recordlist', {title: "Record List", recordlist})
        
           })
        .catch(() => {
            res.send("Sorry, no records!");
        }) 
    }
    }
record.recordcreateget = function(req, res) {
    res.render('recordcreate')
}

record.recordcreatepost = function(req, res) {
    var record = new Record({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        campaign: req.body.campaign,
        organisation: req.user.organisation,
        mobilePhoneNumber:req.body.mobilephonenumber,
        email:req.body.email,
        facebook: req.body.facebook,
        twitter: req.body.twitter,
    })
    record.save().then((record)=> {
        res.redirect('/campaign/recordlist');
    }, (e) => {
        res.status(400).send(e);
    })
}

record.recorddelete = function(req, res) {
    Record.findOneAndDelete({recordid: req.query.id}, (err, recorddetails) => {
        if (err) {
            res.render('error', [])
        } else {
            res.redirect('/campaign/recordlist')
        }
    })
}

//record.recordupdate = function(req, res) {}

record.recordimport = function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
     
    var recordFile = req.files.file;
 
    var records = [];
         
    csv
     .fromString(recordFile.data.toString(), {
         headers: true,
         ignoreEmpty: true
     })
     .on("data", function(data){
         data['_id'] = new mongoose.Types.ObjectId();
          
         records.push(data);
     })
     .on("end", function(){
         Record.create(records, function(err, documents) {
            if (err) throw err;
         });
          
         res.redirect('/campaign/recordlist');
     });
}

module.exports = record;