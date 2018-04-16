/* jshint esversion : 6 */
var User = require('../../Models/user'),
    bcrypt = require('bcryptjs');

module.exports = class Registration {
    constructor() {
        
    }

    Register(user) {        
        return new Promise(function(resolve, reject) {
            user.username = user.username.toLowerCase();
            var newUser = new User(user);
            
            newUser.save(function(err, result) {
                if (err || result === null)
                    return reject("Unable to save user");
                
                return resolve(result);
            });
        });
    }
};