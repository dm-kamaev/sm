'use strict';

const path = require('path');
const express = require('express');

var db = require('./app/components/db');
var soy = require('./app/components/soy');
var modules = require('./app/modules');
var api = require('./api/modules');
var bodyParser = require('body-parser');

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

app.use(express.static(path.join(__dirname, '/public')));


app.use('/', modules.school.router);
app.use('/doc', modules.doc.router);
app.use('/api', api.comment.router);
app.use('/api', api.school.router);
app.use('/', api.debug.router);
//app.use('/', modules.debug);
app.use('/api-debug',express.static(path.join(__dirname, '/api-debug')));
app.use('/apidoc', express.static(path.join(__dirname, '/doc')));



soy.init(__dirname, function() {
    db.sync().then(function() {
        app.listen(CONFIG.PORT, function() {
            console.log('Running at port ' + CONFIG.PORT)
        });
    });
});
