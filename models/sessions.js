var mongoose = require('mongoose');


var connection = mongoose.createConnection("mongodb://localhost:27017/CAVI");



SessionSchema = mongoose.Schema({

    expires: { type: Date },
    session: {
        username: { type: String},
        userdata: {type: String},
        socketid: {type: String},
        passport: { 
            user: { type: String} 
            }
        }
},
{collection: "userSessions" });



var Session = mongoose.model("Session", SessionSchema);





module.exports = {Session}