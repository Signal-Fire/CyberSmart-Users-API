/* jshint esversion: 6 */
var route = require('express').Router();
var Registrar = new(require('../../Handlers/Registration'))();

route.post('/', function(req, res) {
    if (!req.body)
        res.status(400).send("{ error : no user to register }");
    Registrar.Register(req.body).then(newUser => {
        res.status(201).send("{ success : user created }");
    }).catch(error => {
        res.status(400).send("{ error : " + error + " }");
    });
});

module.exports = route;