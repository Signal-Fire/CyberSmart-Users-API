/*jshint esversion: 6*/
var express = require('express'),
    app = express(),
    cors = require('cors'),
    passport = require('passport'),
    config = require('./Configuration'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    Accessor = require('./Routes/Login'),
    Updater = require('./Routes/Update'),
    Registration = require('./Routes/Registration'),
    Finder = require('./Routes/Find');

app.use(cors());

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(compression());

app.use(passport.initialize());
var passport = require('./Handlers/Passport')(passport);

app.use('/register', Registration);
app.use('/find', Finder);
app.use('/update', Updater);
app.use('/login', Accessor);

app.listen(config.port, () => {
    console.log('Sailed through the Iron Islands, landing at ' + config.port);
});