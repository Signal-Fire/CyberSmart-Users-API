/* jshint esversion: 6 */
var route = require('express').Router(),
    Tokenizer = require('../../Handlers/Token'),
    Registrar = require('../../Handlers/Registration');

route.post('/', function(req, res) {  
    if (!req.body)
        return res.status(400).send({ 'error' : error });
        
    Registrar.Register(req.body).then(newUser => {
        return res.status(201).send({ 'token' : Tokenizer.EncodeUser(newUser) });
    }).catch(error => {
        return res.status(400).send({ 'error' : error });
    });
});

module.exports = route;