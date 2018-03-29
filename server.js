/*jshint esversion: 6*/
var express = require('express'),
    app = express(),
    cors = require('cors'),
    passport = require('passport'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
   
    Registration = require('./Routes/Registration'),
    Finder = require('./Routes/Find');

const port = 8080;

app.use(cors());

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(compression());

app.use(passport.initialize());
var passport = require('./Handlers/Passport')(passport);

app.use('/register', Registration);
app.use('/find', Finder);

app.listen(port, () => {
    console.log('Sailed through the Iron Islands, landing at ' + port);
});