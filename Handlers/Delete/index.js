var User = require('../../Models/user'),
    Tokenizer = require('../Token'),
    Logger = require('../Logger');

module.exports = new class Deleter {
    constructor() {

    }

    ById(headers, id, deleter) {
        return new Promise(function(resolve, reject) {
            Tokenizer.GetTokenFrom(headers).then(jwt => {
                User.findOne({ 
                    username : Tokenizer.DecodeJWT(jwt).username 
                }, function(err, result) {
                    if (err || result === null)
                        return reject("Unable to authorise user");
                    
                    User.findByIdAndRemove(id, function(err, deletedUser) {                        
                        if (err || deletedUser === null)
                            return reject("Unable to delete user");

                        Logger.CreateLog({
                            message : 'Removed ' + deletedUser.first_name,
                            created_by_user : deleter,
                            type : "User"
                        });

                        return resolve(deletedUser);
                    });
                })
            })
        });
    }
}