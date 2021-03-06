var route = require('express').Router(),
    passport = require('passport'),
    Tokenizer = require('../../Handlers/Token'),
    Registrar = require('../../Handlers/Registration');

var jwtAuth = passport.authenticate('jwt', {
    session: false
});

route.post('/', jwtAuth, (request, response) => {  
    if (!req.body)
        return res.status(400).send({ 'error' : error });
        
    Registrar.Register(req.headers, req.body).then(newUser => {
        return res.status(201).send(newUser);
    }).catch(error => {
        return res.status(400).send({ 'error' : error });
    });
});

module.exports = route;