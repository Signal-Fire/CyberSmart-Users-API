var route = require('express').Router(),
    Tokenizer = require('../../Handlers/Token'),
    Portal = require('../../Handlers/Login');

route.post('/', function(req, res) {    
    if (!req.body.username || !req.body.password) 
        return res.status(500).send({ "error " : "invalid parameters" });
    
    try {
        Portal.Login(req.body.username, req.body.password).then(user => {
            return res.status(200).send({ "token" : Tokenizer.EncodeUser(user) });
        }).catch(err => {
            return res.status(401).send({ "error" : err });
        });
    } catch (ex) {
        return res.status(500).send({ "error" : ex });
    }
});

module.exports = route;