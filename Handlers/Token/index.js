/* jshint esversion: 6 */
module.exports = class Token {
    constructor() {

    }

    Get(token) {
        return new Promise(function(resolve, reject) {
            if (!token.authorization)
                return reject("No token to validate");

            var parted = token.authorization.split(' ');

            if (parted.length === 2)
                return resolve(parted[1]);
            else  
                return reject("Invalid token");            
        });
    }
};