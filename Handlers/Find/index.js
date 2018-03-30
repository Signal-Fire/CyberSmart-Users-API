/* jshint esversion: 6 */
var jwt = require('jwt-simple'),
    Tokenizer = new(require('../Token'))(),
    User = require('../../Models/user');

module.exports = class Find {
    constructor() {

    }

    FindByJWT(headers) {
        return new Promise(function(resolve, reject) {
            Tokenizer.GetTokenFrom(headers).then(jwt => {
                try {
                    var query = { username : Tokenizer.DecodeJWT(jwt).username };
                    User.findOne(query, function(err, user) {
                        if (err || user === null)
                            return reject("Unable to find user with credentials given");
                        
                        return resolve(Tokenizer.EncodeUser(user));                        
                    });
                } catch (ex) {
                    return reject(ex);
                }
            }).catch(error => {
                return reject(error);
            });
        });
    }

    FindByJWTAndUpdate(headers, update) {
        return new Promise(function(resolve, reject) {
            Tokenizer.GetTokenFrom(headers).then(jwt => {
                var user = Tokenizer.DecodeJWT(jwt);
                bcrypt.genSalt(10).then(salt => {
                    bcrypt.hash(update.password, salt).then(hash => {
                        User.findOneAndUpdate(user, update, function(err, user) {
                            if (err || user === null)
                                return reject("Unable to find or update user");
    
                            return resolve(Tokenizer.EncodeUser(user));
                        });
                    });
                });
            }).catch(error => {
                return reject(error);
            });
            
        });
    }
};