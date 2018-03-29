/* jshint esversion: 6*/
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var bcrypt = require('bcryptjs');
var config = require('../Configuration');

var Schema = mongoose.Schema;

var connection = mongoose.createConnection(config.database);

// set up a mongoose model
var UserSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true,        
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    signup_timestamp: {
        type: String,
        default: Date.now
    }
});

///Save function
UserSchema.pre('save', function (next) {   
    //User = this, this class 
    var user = this;

    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }

                user.password = hash;

                next();
            });
        });
    } else {
        return next();
    }
});

/*UserSchema.pre('findOneAndUpdate', function (next) {
    var passUpdated = this.getUpdate().password !== "";

    if (!passUpdated) {
        return next();
    }
    
    bcrypt.genSalt(10).then(salt => {
        bcrypt.hash(this.getUpdate().password, salt).then(hash => {
            this.findOneAndUpdate({}, { 
                first_name : this.getUpdate().first_name, 
                last_name : this.getUpdate().last_name,
                password : hash 
            });
            return next();
        }).catch(error => {
            console.error(error);
        });
    }).catch(err => {  
        console.error(err);
    });
});*/

module.exports = connection.model('User', UserSchema);