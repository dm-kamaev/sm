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

const DOC_TEMPLATE = {
    template: 'sm.lDoc.Template.index',
    arghs: {
        list:[
            "b-mark",
            "b-stars",
            "b-feedback-modal",
            "b-comments"
        ]
    }
};



app.set('views', path.join(__dirname, 'app/modules/debug/views'));

// template engines
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/public')));


app.get('/doc', (req, res) => {
    console.log('/doc: '+JSON.stringify(DOC_TEMPLATE));
    res.end(
        soy.render(DOC_TEMPLATE.template, DOC_TEMPLATE.arghs)
    );
});

app.get('/doc/:id', (req, res) => {
    var doc_item_template = JSON.parse(JSON.stringify(DOC_TEMPLATE));
    doc_item_template.template = 'sm.lDoc.Template.item';
    doc_item_template.arghs.name = req.params.id;
    console.log('/doctest/' + req.params.id);
    res.end(
        soy.render(doc_item_template.template, doc_item_template.arghs)
    );
});

app.get('/search', (req, res) => {
    console.log('/search');
    // res.send(html);
});


app.use('/', modules.school.router);
app.use('/api', api.comment.router);
app.use('/api', api.school.router);
app.use('/', modules.debug);
app.use('/apidoc', express.static(path.join(__dirname, '/doc')));



soy.init(__dirname, function() {
    db.sync().then(function() {
        app.listen(CONFIG.PORT, function() {
            console.log('Running at port ' + CONFIG.PORT)
        });
    });
});
