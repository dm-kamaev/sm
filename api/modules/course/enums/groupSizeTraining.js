'use strict';

const Enum = require('../../../components/enum');

let enumInstance = new Enum('groupSizeTraining', {
    INDIVIDUAL: 0,
    GROUP: 1,
    ONLINE: 2
});

module.exports = enumInstance;
