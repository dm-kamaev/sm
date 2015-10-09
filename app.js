'use strict';
const path = require('path');
const express = require('express');
const webpack = require('webpack');

// const wpConfig = require('./webpack.config.js');
//
// const compiler = webpack(wpConfig);
//
// compiler.watch({
//     aggregateTimeout: 300, // wait so long for more changes
//     poll: true
// }, (err, stats) => err ? err : stats);

const app = express();
const CONFIG = {
    PORT: 3000
};

const html = path.resolve(__dirname + '/src/index.html');

app.use(express.static(path.resolve(__dirname + '/public')))   ;

app.get('/', (req, res) => {
    console.log('/')
    res.sendFile(html);
});
app.get('/search', (req, res) => {
    console.log('/search');
    res.send(html);
});
app.get('/school/:id', (req, res) => {
    console.log('/school/' + req.params.id)
    res.send(html);
});

app.listen(CONFIG.PORT, () => console.log('Running at port ' + CONFIG.PORT));




// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
// const url = 'mongodb://localhost:27017/test';
// MongoClient.connect(url, function(err, db) {
//     assert.equal(null, err);
//     console.log("Connected correctly to server.");
//     db.close();
// });
