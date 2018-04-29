var route = require('express').Router(),
    Deleter = require('../../Handlers/Delete');

route.post('/:id', function(req, res) {
    if (!req.headers)
        return res.status(500).send({ error : "Unauthorized" });

    Deleter.ById(req.headers, req.params.id)
    .then(result => {
        return res.status(200).send(result);
    }).catch(err => {
        return res.status(400).send({ error : err });
    })
});

module.exports = route;