/* jshint esversion : 6*/
var bcrypt = require('bcryptjs'),
    User = require('../../Models/user'),
    Tokenizer = new(require('../Token'))();

module.exports = class Login {
    constructor() {

    }

    LoginUser(user) {
        return new Promise(function(resolve, reject) {
            User.findOne({ username : user.username }, 
                function(err, result) {
                    if (err || result === null)
                        return reject("Unable to find user");

                    bcrypt.compare( user.password, result.password)
                        .then(res => {
                            if (res) {
                                result.password = '';

                                return resolve(Tokenizer.EncodeUser(result));
                            } else {
                                return reject("Incorrect password");
                            }
                        }).catch(error => {
                            return reject("Issue with Bcrypt");
                        });
                });
        });
    }
};