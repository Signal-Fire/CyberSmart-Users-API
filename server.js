/*jshint esversion: 6*/
var express = require('express'),
    app = express(),
    cors = require('cors');

const port = 8080;

app.use(cors());

app.listen(port, () => {
    console.log('Sailed through the Iron Islands, landing at ' + port);
});