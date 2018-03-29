/* jshint esversion: 6 */
var jwt = require('jwt-simple'),
    config = require('../../Configuration');

module.exports = class Token {
    constructor() {

    }

    GetTokenFrom(headers) {
        return new Promise(function(resolve, reject) {
            if (!headers.authorization)
                return reject("No token to validate");

            var parted = headers.authorization.split(' ');

            if (parted.length === 2)
                return resolve(parted[1]);
            else  
                return reject("Invalid token");            
        });
    }

    EncodeUser(user) {
        return jwt.encode(user, config.secret);
    }

    DecodeJWT(token) {
        return jwt.decode(token, config.secret);
    }
};