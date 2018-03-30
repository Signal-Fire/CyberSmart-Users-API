/* jshint esversion : 6 */
var route = require('express').Router(),
    Accessor = new(require('../../Handlers/Login'))();

route.post('/', function(req, res) {
    Accessor.LoginUser(req.body).then(response => {
        return res.status(200).send({ "token " : response });
    }).catch(error => {
        return res.status(401).send({ "error " : error });
    });
});

module.exports = route;