/* jshint esversion : 6 */
var User = require('../../Models/user'),
    bcrypt = require('bcryptjs'),
    Logger = new(require('../Logger'))();

module.exports = class Registration {
    constructor() {
        
    }

    Register(user) {
        return new Promise(function(resolve, reject) {
            var newUser = new User(user);

            newUser.save(function(err, result) {
                if (err || result === null)
                    return reject("Unable to save user");
                
                Logger.Create(result.username + ' registered as a new user!', result.username);
                
                return resolve(result);
            });
        });
    }
};