'use strict';

const path = require('path');
const express = require('express');
const morgan = require('morgan');

var db = require('./app/components/db');
var soy = require('./app/components/soy');
const StartupControl = require('./app/components/startupControl/startupControl');

var modules = require('./app/modules');
var api = require('./api/modules');
var bodyParser = require('body-parser');
var vm = require('vm');
var fs = require('fs');

const await = require('asyncawait/await');
const async = require('asyncawait/async');

const app = express();

const CONFIG = {
    PORT: 3000
};

app.set('views', path.join(__dirname, 'api-debug'));

// template engines
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '/public')));


app.use('/', modules.school.router);
app.use('/doc', modules.doc.router);
app.use('/api', api.comment.router);
app.use('/api', api.school.router);
app.use('/api', api.geo.router);
app.use('/', api.debug.router);

app.use('/apidoc', express.static(path.join(__dirname, '/doc')));
app.use('/api-debug', express.static(path.join(__dirname, '/api-debug')));


async(function() {
    var startupControl = new StartupControl({
        'checkMigrations': true
    });
    await(startupControl.check());

    var compiledTemplatesPath = path.join(
        __dirname,
        '/tmp/compiledServerSoy/server.soy.concat.js'
    );
    await(soy.init(compiledTemplatesPath));

    app.listen(CONFIG.PORT, function() {
        console.log('Running at port ' + CONFIG.PORT)
    });
})();
