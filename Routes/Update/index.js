/* jshint esversion : 6 */
var route = require('express').Router();
var Updater = new(require('../../Handlers/Update'))();

route.post('/user', function(req, res) {
    if (!req.headers || !req.body)
        return res.status(500).send({ "error" : "Invalid parameters" });
        
    try {
        Updater.FindByJWTAndUpdate(req.headers, req.body)
        .then(updated => {
            return res.status(200).send({ "token " : updated });
        }).catch(error => {
            return res.status(401).send({ "error " : error });
        });
    } catch (ex) {
        return res.status(500).send({ "error" : error });
    }
});

module.exports = route;