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
};