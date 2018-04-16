var Users = require('../../Models/user'),
    bcrypt = require('bcryptjs'),
    Tokenizer = new(require('../Token'))();

module.exports = class Login {
    constructor() {
        
    }

    Login(user, password) {
        return new Promise(function(resolve, reject) {
            Users.findOne({
                username: user.toLowerCase()                
            }, function(err, user) {
                if (err || user === null)
                    return reject(err);    

                bcrypt.compare(password, user.password).then(res => {
                    if (!res)
                        return reject("Invalid details");                    
                        
                    return resolve(Tokenizer.EncodeUser(res));
                }).catch(err => {
                    return reject(err);
                });
            });
        });
    }
};