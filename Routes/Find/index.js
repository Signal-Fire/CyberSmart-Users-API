/* jshint esversion : 6 */
var route = require('express').Router(),
    passport = require('passport');

var jwtAuth = passport.authenticate('jwt', {
    session: false
});

route.get('/user', jwtAuth, function(req, res) {
    
});

module.exports = route;