'use strict';

const Enum = require('../../../components/enum');

module.exports = new Enum('courseImageSize', {
    SMALL: [300, 197],
    MEDIUM: [648, 426],
    LARGE: [880, 579]
});

console.log(module.exports.toArray());
