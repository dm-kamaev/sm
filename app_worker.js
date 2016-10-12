'use strict';

const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const csrf = require('./app/middleware/csrf');
const session = require('./app/components/session');
var configurePassport = require('./app/components/configurePassport');
const soy = require('./node_modules/clobl/soy').setOptions({
    templateFactory: path.join(
        __dirname,
        'app/blocks/n-clobl/i-factory/i-template-factory_stendhal.js'
    ),
    closureLibrary: path.join(
        __dirname,
        'node_modules/google-closure-library'
    ),
    closureTemplates: path.join(
        __dirname,
        'node_modules/closure-templates'
    )
});

var modules = require('./app/modules');
var api = require('./api/modules');
var bodyParser = require('body-parser');

var errorController =
    require('./app/modules/error/controllers/errorController');

const async = require('asyncawait/async');

const app = express();

const config = require('./app/config').config;

const morgan = require('morgan');
const expressLogStream = require('./app/components/logger/expressLogStream');
const redis = require('./app/components/redis');

app.set('views', path.join(__dirname, 'api-debug'));

// template engines
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, '/public')));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

if (config.environment == 'development') {
    app.use('/doc', modules.doc.router);
    app.use('/', api.debug.router);
    app.use('/apidoc', express.static(path.join(__dirname, '/doc')));
    app.use('/api-debug', express.static(path.join(__dirname, '/api-debug')));
}


app.use(morgan('dev', {
    skip: (req, res) => res.statusCode >= 400,
    stream: expressLogStream.debug
}));
app.use(morgan('dev', {
    skip: (req, res) => res.statusCode < 400,
    stream: expressLogStream.warning
}));

app.use('/courses/api', api.course.router);

app.use(csrf);

app.use('/schools/', modules.school.router);
app.use('/courses/', modules.course.router);

app.use('/:subdomain/api', api.mail.router);
app.use('/:subdomain/', api.user.router);
app.use('/:subdomain/api', api.comment.router);
app.use('/schools/api', api.school.router);
app.use('/:subdomain/api', api.geo.router);
app.use('/:subdomain/api', api.feedback.router);
app.use('/:subdomain/api', api.favorite.router);
app.use('/:subdomain/api', api.entity.router);

async(function() {
    var paths = [
        'build/compiledServerSoy/server.soy.concat.js',
        'node_modules/clobl/blocks/i-utils/i-utils.js',
        'node_modules/clobl/blocks/i-utils-legacy/i-utils.js'
    ];
    soy.loadFiles(
        paths.map(item => path.join(__dirname, item)),
        function() {
            app.listen(config.port, function() {
                redis.connect();
            });
        }
    );

    configurePassport();
})();

app.use(function(req, res, next) {
    res.status(404);
    errorController.notFound(req, res);
});
