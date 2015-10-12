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

const soyTemplate = (dir, template) => soynode.compileTemplates(dir, (err) => err ?
console.log('Compilation fucked up: ' + err) : soynode.render(template));

const html = soyTemplate(path.resolve(__dirname + '/dev/blocks/l-schools'), 'mel.lschools.layout');

app.use(express.static(path.resolve(__dirname + '/public')));


app.get('/', (req, res) => {
    console.log('/');
    res.sendFile(html);
    // console.log(html)
});

app.get('/search', (req, res) => {
    console.log('/search');
    res.send(html);
});

app.get('/school/:id', (req, res) => {
    console.log('/school/' + req.params.id);
    res.send(html);
});


app.listen(CONFIG.PORT, () => console.log('Running at port ' + CONFIG.PORT));
