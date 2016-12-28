'use strict';

const logger = require('./logger').getLogger('express');
const Stream = require('stream');

let warningStream = new Stream.Writable({
    write: function(chunk, encoding, next) {
        logger.warning(chunk.toString());
        next();
    }
});

let debugStream = new Stream.Writable({
    write: function(chunk, encoding, next) {
        logger.debug(chunk.toString());
        next();
    }
});

let criticalStream = new Stream.Writable({
    write: function(chunk, encoding, next) {
        logger.critical(chunk.toString());
        next();
    }
});

module.exports = {
    warning: warningStream,
    debug: debugStream,
    critical: criticalStream
};
