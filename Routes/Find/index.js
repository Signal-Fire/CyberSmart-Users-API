/* jshint esversion : 6 */
var route = require('express').Router(),
    passport = require('passport'),
    Tokenizer = require('../../Handlers/Token'),
    Finder = require('../../Handlers/Find');

var jwtAuth = passport.authenticate('jwt', {
    session: false
});

route.get('/user/details', jwtAuth, function(req, res) {
    if (!req.headers)
        return res.status(500).send({ "error" : "Invalid parameters" });

    Finder.FindDetailsFromJWT(req.headers).then(user => {
        return res.status(200).send(user);
    }).catch(error => {
        return res.status(400).send({ "error" : error });
    })
});

route.get('/user', jwtAuth, function(req, res) {
    if (!req.headers)
        return res.status(500).send({ "error" : "Invalid parameters" });
        
    Finder.FindByJWT(req.headers).then(user => {
        return res.status(200).send({ "token" : Tokenizer.EncodeUser(user) });
    }).catch(error => {
        return res.status(400).send({ "error" : error });
    });
});

module.exports = route;