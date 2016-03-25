var passport = require('passport');

var async = require('asyncawait/async');
var await = require('asyncawait/await');

var services = require.main.require('./app/components/services').all;

module.exports = function() {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async(function (id, done) {
        userData = await(services.user.getUserById(id));
        done(null, userData);
    }));
};
