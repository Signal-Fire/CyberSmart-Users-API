var User = require('../../Models/user'),
    Tokenizer = require('../Token');

module.exports = new class Deleter {
    constructor() {

    }

    ById(headers, id) {
        return new Promise(function(resolve, reject) {
            Tokenizer.GetTokenFrom(headers).then(jwt => {
                User.findOne({ 
                    username : Tokenizer.DecodeJWT(jwt).username 
                }, function(err, result) {
                    if (err || result === null)
                        return reject("Unable to authorise user");
                    
                    User.findByIdAndRemove(id, function(err, done) {                        
                        if (err || done === null)
                            return reject("Unable to delete user");

                        return resolve(done);
                    });
                })
            })
        });
    }
}