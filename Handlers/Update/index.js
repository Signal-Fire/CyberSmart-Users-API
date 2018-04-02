/* jshint esversion : 6 */
var Tokenizer = new(require('../Token'))(),
    Logger = new(require('../../Handlers/Logger'))(),
    Finder = new(require('../../Handlers/Find'))(),
    User = require('../../Models/user'),
    bcrypt = require('bcryptjs');

module.exports = class Update {
    constructor() {

    }

    FindByJWTAndUpdate(headers, update) {
        return new Promise(function(resolve, reject) {
            Tokenizer.GetTokenFrom(headers).then(jwt => {
                var user = Tokenizer.DecodeJWT(jwt);
                bcrypt.genSalt(10).then(salt => {
                    bcrypt.hash(update.password, salt).then(hash => {
                        update.password = hash;
                        User.findOneAndUpdate(user, update, function(err, result) {
                            if (err || result === null)
                                return reject("Unable to find or update user");

                            Logger.Create(update.username + " updated their details!", update.username);

                            return resolve(Tokenizer.EncodeUser(update));
                        });
                    });
                });
            }).catch(error => {
                return reject(error);
            });            
        });
    }
};