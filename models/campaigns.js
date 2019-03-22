var mongoose = require('mongoose');
//var bcrypt = require('bcryptjs');
//var AutoIncrement = require('mongoose-sequence')(mongoose);
var AutoIncrement = require('mongoose-auto-increment')
var connection = mongoose.createConnection("mongodb://localhost:27017/CAVI");

AutoIncrement.initialize(connection)
CampaignSchema = mongoose.Schema({
    campaignName: {
        type: String
    },
    campaignDescription: {
        type: String
    },
    organisation: {
        type: String
    }

})

//UserSchema.plugin(AutoIncrement, {inc_field: 'userid'});
CampaignSchema.plugin(AutoIncrement.plugin, {model: "Campaign", field: "campaignid", startAt: 100000001} );
var Campaign = mongoose.model("Campaign", CampaignSchema);


module.exports = {Campaign}