var mongoose = require('mongoose');
//var bcrypt = require('bcryptjs');
//var AutoIncrement = require('mongoose-sequence')(mongoose);
var AutoIncrement = require('mongoose-auto-increment')
var connection = mongoose.createConnection("mongodb://localhost:27017/CAVI");

AutoIncrement.initialize(connection)
UserSchema = mongoose.Schema({
    // userid: {
    //     type: Number
    // },
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
    },
    adminUser: {
        type: Boolean
    },
    adminUserStr: {
        type: String
    }

})

//UserSchema.plugin(AutoIncrement, {inc_field: 'userid'});
UserSchema.plugin(AutoIncrement.plugin, {model: "User", field: "userid", startAt: 100000006} );
var User = mongoose.model("User", UserSchema);


module.exports = {User}