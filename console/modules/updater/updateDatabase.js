'use strict';

var Converter = require("csvtojson").Converter;
var converter = new Converter({});

/**
 * @param {string}              sourcePath
 * @param {function}            handler
 * @param {object}              parsers
 */
module.exports = function(sourcePath, handler, parsers) {
    converter.fromFile(sourcePath, function(err, rows) {
        if (err) {
            console.log(err);
        } else {
            handler(rows, parsers);
        }
    });
};
