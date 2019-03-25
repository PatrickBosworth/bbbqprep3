var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-auto-increment')
var connection = mongoose.createConnection("mongodb://localhost:27017/CAVI");

AutoIncrement.initialize(connection)

var RecordSchema = mongoose.Schema({
    firstName: {
            type: String,
            required: true
        },
    lastName: {
            type: String,
            required: true
    },
    campaign: {
        type: String,
        required: true
    },
    organisation: {
        type: String,
        required: true
    },
    mobilePhoneNumber: {
        type: String,
        required: true
    },
    twitter: {
        type: String,
        validate: {
            validator: function(text) {
                if (text !== null && text.length > 0)
                    return text.indexOf('https://twitter.com/') === 0;
                 
                return true;
            },
            message: 'Twitter handle must start with https://twitter.com/'
        }
    },
    facebook: {
        type: String,
        validate: {
            validator: function(text) {
                if (text !== null && text.length > 0)
                    return text.indexOf('https://www.facebook.com/') === 0;
                 
                return true;
            },
            message: 'Facebook Page must start with https://www.facebook.com/'
        }
    },
    linkedin: {
        type: String,
        validate: {
            validator: function(text) {
                if (text !== null && text.length > 0)
                    return text.indexOf('https://www.linkedin.com/') === 0;
                 
                return true;
            },
            message: 'LinkedIn must start with https://www.linkedin.com/'
        }
    }

}
);

RecordSchema.plugin(AutoIncrement.plugin, {model: "Record", field: "recordid", startAt: 100000001} );

var Record = mongoose.model('Record', RecordSchema);
 
module.exports = {Record};