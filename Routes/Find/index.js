/* jshint esversion : 6 */
var route = require('express').Router(),
    passport = require('passport'),
    Finder = new(require('../../Handlers/Find'))();

var jwtAuth = passport.authenticate('jwt', {
    session: false
});

route.get('/user', jwtAuth, function(req, res) {
    if (!req.headers)
        return res.status(500).send({ "error" : "Invalid parameters" });
        
    Finder.FindByJWT(req.headers).then(token => {
        return res.status(200).send({ "token" : token });
    }).catch(error => {
        return res.status(400).send({ "error" : error });
    });
});

route.post('/update', jwtAuth, function(req, res) {
    if (!req.headers || !req.body)
        return res.status(500).send({ "error" : "Invalid parameters" });

    Finder.FindByJWTAndUpdate(req.headers, req.body).then(token => {
        return res.status(200).send({ "token" : token });
    }).catch(err => {
        return res.status(400).send({ "error" : err });
    });
});
module.exports = route;