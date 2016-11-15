'use strict';

const Enum = require('../../../components/enum');

let enumInstance = new Enum('filterName', {
    CLASSES: 'classes',
    SCHOOL_TYPE: 'schoolType',
    EGE: 'ege',
    GIA: 'gia',
    OLIMP: 'olimp',
    SPECIALIZED_CLASS_TYPE: 'specializedClassType',
    ACTIVITY_SPHERE: 'activitySphere'
});

module.exports = enumInstance;
