/* jshint esversion : 6 */
var User = require('../../Models/user');
var bcrypt = require('bcryptjs');

module.exports = class Registration {
    constructor() {
        
    }

    Register(user) {
        return new Promise(function(resolve, reject) {
            var newUser = new User(user);

            newUser.save(function(err, result) {
                if (err || result === null)
                    return reject("Unable to save user");
                
                return resolve(result);
            });
        });
    }

    FindOne(query) {
        return new Promise(function(resolve, reject) {

        });
    }

    FindOneAndUpdate(user, query) {
        return new Promise(function(resolve, reject) {
            bcrypt.genSalt(10).then(salt => {
                bcrypt.hash(user.password, salt).then(hash => {
                    User.findOneAndUpdate(user, query, function(err, result) {
                        if (err || result === null)
                            return reject("Unable to find or update user");

                        return resolve(result);
                    });
                });
            });
        });
    }
};