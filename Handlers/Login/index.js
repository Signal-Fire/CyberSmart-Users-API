var Users = require('../../Models/user');
var bcrypt = require('bcryptjs');

module.exports = class Login {
    constructor() {
        
    }

    Login(user, password) {
        return new Promise(function(resolve, reject) {
            Users.findOne({
                username: user                
            }, function(err, user) {
                if (err)
                    return reject(err);
                bcrypt.compare(user.password, password).then(res => {
                    console.log(res);
                    return resolve(res);
                }).catch(err => {
                    return reject(err);
                });
            });
        });
    }
};