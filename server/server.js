var express = require('express')();
//var server = express();
var app = require('../app.js');


app.listen(3000, () => {
    console.log('express started on port 3000');
});