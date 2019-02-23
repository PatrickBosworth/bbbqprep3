var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var User = mongoose.model("User", {
    userid: {
        type: Number
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    username: {
        type: String
    },
    organisation: {
        type: String      
    },
    password: {
        type: String,
        default: "Passw0rd"
    }

});


module.exports = {User}