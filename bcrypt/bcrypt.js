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
    bcrypt.hash(password, salt, ( function(hash) {console.log("this is hash: " + this.hash)}))
}

//Async promises version - not working
encrypt.encryptpassword4 = function(password) {
   var hashedpwd = '';
   bcrypt
    .hash(password, 10)
    .then(hashedpwd => {
        console.log("hash: " + hashedpwd)
        return "hashedpwd";
    })
    .catch(console.log("not working"));
return hashedpwd;
}





module.exports = encrypt;