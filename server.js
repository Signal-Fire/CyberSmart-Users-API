/*jshint esversion: 6*/
var express = require('express'),
    app = express(),
    cors = require('cors'),
    Registration = require('./Routes/Registration');

const port = 8080;

app.use(cors());

app.use('/register', Registration);

app.listen(port, () => {
    console.log('Sailed through the Iron Islands, landing at ' + port);
});