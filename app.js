'use strict';

const path = require('path');
const express = require('express');
const soynode = require('soynode');

const app = express();

const CONFIG = {
    PORT: 3000
};

const LANDING_TEMPLATE = {
    template: 'mel.lschools.layout',
    params: {}
};
// soynode.setOptions({
//     allowDinamicRecompile: true
// });

const sendCompiledTemplate = (action, templateObj) =>
    soynode.loadCompiledTemplateFiles(path.join(__dirname + '/tmp/templates.js'), (err) =>
        err ? console.log('Compilation failed: ' + err) : action(soynode.render(templateObj.template, templateObj.params))
);


app.use(express.static(path.join(__dirname + '/public')));


app.get('/', (req, res) => {
    console.log('/');
    sendCompiledTemplate(res.send.bind(res), LANDING_TEMPLATE);
});

app.get('/search', (req, res) => {
    console.log('/search');
    // res.send(html);
});

app.get('/school/:id', (req, res) => {
    console.log('/school/' + req.params.id);
    // res.send(html);
});


app.listen(CONFIG.PORT, () => console.log('Running at port ' + CONFIG.PORT));
