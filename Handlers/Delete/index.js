var User = require('../../Models/user'),
    Tokenizer = require('../Token'),
    Logger = require('../Logger');

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
                    
                    if (String(result._id) === id)
                        return reject("Unable to delete own user");

                    User.findByIdAndRemove(id, function(err, deletedUser) {                        
                        if (err || deletedUser === null)
                            return reject("Unable to delete user");
                        
                        Logger.CreateLog({
                            message : 'Removed ' + deletedUser.first_name,
                            created_by_user : result.first_name,
                            type : "User"
                        });

                        return resolve(deletedUser);
                    });
                })
            })
        });
    }
}