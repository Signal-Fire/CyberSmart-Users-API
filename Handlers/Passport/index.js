var User = require('../../Models/user');
var config = require('../../Configuration'); 

var ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
opts.secretOrKey = config.secret;
var JwtStrategy = new(require('passport-jwt').Strategy)(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
            // or you could create a new account
        }
    });
});

module.exports = function (passport) {
    passport.use('jwt', JwtStrategy);
};