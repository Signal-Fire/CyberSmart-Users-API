var Users = require('../../Models/user'),
    bcrypt = require('bcryptjs'),
    Tokenizer = require('../Token');

module.exports = new class Login {
    constructor() {
        
    }

    Login(user, password) {
        return new Promise(function(resolve, reject) {
            Users.findOne({
                username: user.toLowerCase()                
            }, function(err, user) {
                if (err || user === null)
                    return reject("Unable to find user");    

                bcrypt.compare(password, user.password).then(res => {
                    if (!res)
                        return reject("Invalid details");                    
                        
                    return resolve(user);
                }).catch(err => {
                    return reject(err);
                });
            });
        });
    }
};