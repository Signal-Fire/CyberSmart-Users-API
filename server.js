var express = require('express'),
    app = express(),
    helmet = require('helmet'), //Anti-HTTP vulnerability middleware
    config = require('./Configuration'),
    cors = require('cors'),
    passport = require('passport'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    Portal = require('./Routes/Login'),
    Updater = require('./Routes/Update'),
    Registration = require('./Routes/Registration'),
    Finder = require('./Routes/Find');

app.use(helmet());
app.use(cors());

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(bodyParser.json());

app.use(compression());

app.use(passport.initialize());
var passport = require('./Handlers/Passport')(passport);

app.use('/register', Registration);
app.use('/find', Finder);
app.use('/login', Portal);
app.use('/update', Updater);

app.listen(config.port, () => {
    console.log('Sailed through the Iron Islands, landing at ' + config.port);
});