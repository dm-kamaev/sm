'use strict';

const path = require('path');
const async = require('asyncawait/async');

const Archiver = require('../../console/modules/modelArchiver/Archiver.js');

const TABLE_NAME = 'school_specialized_class';
const DELIMITER = '|';
const FILE_PATH = 'api/modules/school/migrations';
const FILE_NAME = '20170216215800-school-specialized-class-data.tar.gz';

module.exports = {
    up: async(function() {
        const dir = path.join(
            __dirname,
            '../../',
            FILE_PATH
        );
        const filePath = path.join(dir, FILE_NAME);
        const archiver = new Archiver(filePath);

        archiver.fillTable(TABLE_NAME, DELIMITER);
    }),
    down: function() {
        return; // it's data migration, you can't rollback it
    }
};
