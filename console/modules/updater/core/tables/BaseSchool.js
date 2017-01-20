'use strict';

const Table = require('./Table');

class BaseSchool extends Table {
    /**
     * Name getter
     */
    get name() {
        return 'school';
    }
};

module.exports = BaseSchool;
