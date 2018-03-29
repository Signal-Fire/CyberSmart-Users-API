/* jshint esversion : 6 */
var route = require('express').Router(),
    passport = require('passport'),
    Finder = new(require('../../Handlers/Find'))();

var jwtAuth = passport.authenticate('jwt', {
    session: false
});

route.get('/user', jwtAuth, function(req, res) {
    Finder.FindByJWT(req.headers).then(token => {
        return res.status(200).send({ "token " : token });
    }).catch(error => {
        return res.status(400).send({ "error " : error });
    });
});

module.exports = route;