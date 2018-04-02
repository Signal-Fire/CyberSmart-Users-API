var request = require('request'),
    config = require('../../Configuration');

module.exports = class Logger {
    constructor() {

    }

    Create(message, createdBy) {
        if (!message || !createdBy)
            return true;

        request.post({url:config["logger-api"] + '/create', 
            body: JSON.stringify({
                message : message,
                created_by_user : createdBy
            }),
            headers : {
                'Content-Type' : 'application/json'
            }}, 
            function optionalCallback(err, httpResponse, body) {
                if (err) 
                    return false;
                return true;
            });
    }

    FindAll() {

    }

    FindByUserId(userId) {

    }
};