var pass = require('../config').config['admin-token'];
module.exports = function(req, res, next) {
    if(req.headers['admin-token'] === pass) {
        next();
    } else {
        res.status(403);
        res.end();
    }
};
