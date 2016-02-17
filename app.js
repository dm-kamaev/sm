'use strict';

const path = require('path');
const express = require('express');
const morgan = require('morgan');

var db = require('./app/components/db');
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

    var paths = [
        'build/compiledSeverSoy/server.soy.concat.js',
        'node_modules/clobl/blocks/i-utils/i-utils.js',
        'node_modules/clobl/blocks/i-utils-legacy/i-utils.js',
        'node_modules/clobl/blocks/i-factory/i-template-factory.js'
    ];
    soy.loadFiles(
        paths.map(item => path.join(__dirname, item)),
        function() {
            app.listen(CONFIG.PORT, function() {
                console.log('Running at port ' + CONFIG.PORT)
            });
        }
    );
})();
