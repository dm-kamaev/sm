module.exports = function(app) {
    var csrf = require('csurf');

    app.use(csrf({
        cookie: true
    }));
};
