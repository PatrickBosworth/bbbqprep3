var session = require('express-session');

var MongoDBStore = require('connect-mongodb-session')(session);

var numExpectedSources = 2;
storeconfig = {};

storeconfig.store = new MongoDBStore(
//var store = new MongoDBStore(
  {
    uri: 'mongodb://localhost:27017/CAVI',
    databaseName: 'CAVI',
    collection: 'userSessions'
  },
  function(error) {
    if (error) {  console.log(error) }
  });
 
storeconfig.store.on('error', function(error) {
  console.log(error)
});

module.exports = storeconfig;