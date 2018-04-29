var axios = require('axios'),
    config = require('../../Configuration');

class Logger {
    constructor() {

    }

    CreateLog(log) { 
        axios.post(config["logger-url"] + "/create", log).then(res => {
            return true;
        }).catch(err => {
            return false;
        })
    }
}

module.exports = new(Logger);