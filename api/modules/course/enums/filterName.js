'use strict';

const Enum = require('../../../components/enum');

let enumInstance = new Enum('filterName', {
    FORM_TRAINING: 'formTraining',
    TYPE: 'type',
    AGE: 'age',
    COST: 'cost',
    WEEK_DAYS: 'weekdays',
    TIME: 'time',
    REGULARITY: 'regularity',
    DURATION: 'duration'
});

module.exports = enumInstance;
