'use strict';

const Enum = require('../../../components/enum');

let filterViewType = new Enum('filterViewType', {
    CLASSES: 'classes',
    EXTENDED: 'extended',
    INPUT: 'input',
    LABELS: 'labels',
    SWITCH: 'switch',
    DROPDOWN: 'dropdown',
    SWITCH_LABELS: 'switch-labels'
});

module.exports = filterViewType;
