const bcrypt = require('bcryptjs');



var encrypt = {};


//sync version - not ideal as node is single threaded
encrypt.encryptpassword = function (password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
}


//Async callback version - not yet working.
encrypt.encryptpassword2 =  function(password) {
    var salt = bcrypt.genSaltSync(10); 
    console.log("this is salt: " + salt);
    console.log(password)
    var hashedpwd = bcrypt.hash(password, salt, ( function(err, hash) {
        if (err) { console.log(err)}
        else {
        console.log("this is hash: " + hash)
        hashedpwd = hash;
        }
    }))
    console.log("final hashedpwd " + hashedpwd) //returns undefined
    return hashedpwd;
}

//Async promises version - not working
encrypt.encryptpassword4 = function(password) {
   var hashedpwd = '';
   bcrypt
    .hash(password, 10)
    .then((hash) => {
        console.log("hash: " + hash)
        hashedpwd = hash;
        return;
    })
    .catch(console.log("not working"));
    console.log("this is the final return hash: " + hashedpwd)
    return hashedpwd;
}





module.exports = encrypt;