'use strict';

const Table = require('./Table');

class BaseSchool extends Table {
    get name() {
        return 'school';
    }
};

module.exports = BaseSchool;
