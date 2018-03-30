/* jshint esversion : 6 */
var route = require('express').Router();
var Updater = new(require('../../Handlers/Update'))();

route.post('/user', function(req, res) {
    Updater.FindByJWTAndUpdate(req.headers, req.body)
    .then(updated => {
        return res.status(201).send({ "token " : updated });
    }).catch(error => {
        return res.status(400).send({ "error " : error });
    });
});

module.exports = route;