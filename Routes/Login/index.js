var route = require('express').Router();
var Portal = new(require('../../Handlers/Login'))();

route.post('/', function(req, res) {
    if (!req.body.username || !req.body.password) 
        return res.status(500).send({ "error " : "invalid parameters" });
    
    try {
        Portal.Login(req.body.username, req.body.password).then(token => {
            return res.status(200).send({ "token" : token});
        }).catch(err => {
            return res.status(401).send({ "error" : err });
        });
    } catch (ex) {
        return res.status(500).send({ "error" : ex });
    }
});
module.exports = route;