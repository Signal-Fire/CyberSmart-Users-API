/* jshint esversion: 6 */
var jwt = require('jwt-simple'),
    Tokenizer = require('../Token'),
    User = require('../../Models/user');

module.exports = new class Find {
    constructor() {

    }

    FindDetailsFromJWT(headers) {
        return new Promise(function(resolve, reject) {
            Tokenizer.GetTokenFrom(headers).then(jwt => {
                var query = { username : Tokenizer.DecodeJWT(jwt).username }
                User.findOne(query, function(err, user) {
                    if (err || user === null)
                        return reject("Unable to find user from ID");

                    var returnModel = {
                        'id' : user._id,
                        'username' : user.username,
                        'full_name' : user.first_name + ' ' + user.last_name
                    }
                    
                    return resolve(returnModel);
                });
            });
        });
    }

    FindByJWT(headers) {
        return new Promise(function(resolve, reject) {
            Tokenizer.GetTokenFrom(headers).then(jwt => {
                try {
                    var query = { username : Tokenizer.DecodeJWT(jwt).username };
                    User.findOne(query, function(err, user) {
                        if (err || user === null)
                            return reject("Unable to find user with credentials given");
                        
                        return resolve(user);                        
                    });
                } catch (ex) {
                    return reject(ex);
                }
            }).catch(error => {
                return reject(error);
            });
        });
    }

    FindAllUsers(headers) {
        return new Promise(function(resolve, reject) {
            Tokenizer.GetTokenFrom(headers).then(jwt => {
                try {
                    var query = { username : Tokenizer.DecodeJWT(jwt).username };                    
                    User.findOne(query, function(err, user) {
                        if (err || user === null)
                            return reject("Invalid User");
                        
                        User.find({}, function(err, users) {
                            if (err || users === null)
                                return reject("No Users");
                                
                            return resolve(users);
                        });                      
                    });
                } catch (ex) {
                    return reject(ex);
                }
            }).catch(error => {
                return reject(error);
            });
        });
    }
};