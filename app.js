'use strict';

const path = require('path');
const express = require('express');
const soynode = require('soynode');

const app = express();
const CONFIG = {
    PORT: 3000
};
//
// soynode.setOptions({
//     allowDinamicRecompile: true
// });

const sendCompiledTemplate = (template, action) =>
    soynode.loadCompiledTemplates(path.resolve(__dirname, '/tmp'), (err) =>
        err ? console.log('Compilation fucked up: ' + err) : action(soynode.render(template))
);

// const html = soyTemplate(path.resolve(__dirname + '/dev/blocks/l-schools'), 'mel.lschools.layout');
// console.log(html);
app.use(express.static(path.resolve(__dirname + '/public')));


app.get('/', (req, res) => {
    console.log('/');
    sendCompiledTemplate('mel.lschools.layout', res.send.bind(res));
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
