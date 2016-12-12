var passport = require('passport');

var async = require('asyncawait/async');
var await = require('asyncawait/await');

var services = require('./services').all;

module.exports = function() {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async(function(id, done) {
        try {
            var userData = await(services.user.getUserById(id));
            done(null, userData);
        } catch (error) {
            done(error, null);
        }
    }));
};
