'use strict';

const Enum = require('../../../components/enum');

let filterName = new Enum('filterName', {
    CLASSES: 'classes',
    SCHOOL_TYPE: 'schoolType',
    EGE: 'ege',
    GIA: 'gia',
    OLYMPIAD: 'olimp',
    SPECIALIZED_CLASS_TYPE: 'specializedClassType',
    ACTIVITY_SPHERE: 'activitySphere'
});

module.exports = filterName;
