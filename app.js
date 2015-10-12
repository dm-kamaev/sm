'use strict';

const path = require('path');
const express = require('express');

const app = express();
const CONFIG = {
    PORT: 3000
};

const html = path.resolve(__dirname + '/dev/index.html');

app.use(express.static(path.resolve(__dirname + '/public')));


app.get('/', (req, res) => {
    console.log('/');
    res.sendFile(html);
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
