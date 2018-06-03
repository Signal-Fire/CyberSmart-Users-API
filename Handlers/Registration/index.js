var User = require('../../Models/user'),
    bcrypt = require('bcryptjs'),
    Tokenizer = require('../Token'),
    Logger = require('../Logger');

module.exports = new class Registration {
    constructor() {
        
    }

    Register(headers, user) {        
        return new Promise(function(resolve, reject) {
            Tokenizer.GetTokenFrom(headers).then(jwt => {
                User.findOne({ 
                    username : Tokenizer.DecodeJWT(jwt).username.toLowerCase() 
                }, function(err, result) {
                    if (err || result === null)
                        return reject("Unable to authorise user");
                    
                    user.username = user.username.toLowerCase();
                    
                    var newUser = new User(user);
                    
                    newUser.save(function(err, result) {
                        if (err || result === null)
                            return reject("Unable to save user");
                        
                        Logger.CreateLog({
                            message : 'Registered ' + result.first_name,
                            created_by_user : user.registrar,
                            type : "User"
                        });    
                            
                        return resolve(result);
                    });
                })
            })
            
        });
    }
};