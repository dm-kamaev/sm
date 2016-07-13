'use strict';

var Converter = require("csvtojson").Converter;
var converter = new Converter({});

module.exports = function(sourcePath, handler, parsers) {
    converter.fromFile(sourcePath, function(err, rows) {
        if (err) {
            console.log(err);
        } else {
            handler(rows, parsers);
        }
    });
};
