const bcrypt = require('bcryptjs');

var encrypt = {};



encrypt.encryptpassword = function (password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password);
    return hash;
}

//Async version - not yet working.
// encrypt.encryptpassword2 = function(password, hashedpwd) {
//     hashedpwd = bcrypt.genSalt(10, function(err, salt) {
//         bcrypt.hash(password), salt, function(err, hash) {
//             return hash;
//         };
//             return hash;
//             });
//             return hashedpwd

// }


module.exports = encrypt;