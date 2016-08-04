'use strict';

const async = require('asyncawait/async'),
    path = require('path');

const Archiver = require('../../console/modules/modelArchiver/Archiver.js');

const TABLE = 'specialized_class_type',
    DELIMITER = '|';

module.exports = {
    up: async(function() {
        var dir = path.join(
                __dirname,
                '../../api/modules/school/migrations'
            ),
            file = '20160711155342-specialized-class-type-data.tar.gz',
            filePath = path.join(dir, file),
            archiver = new Archiver(filePath);

        archiver.fillTable(TABLE, DELIMITER);
    }),
    down: async(function() {
        return null;
    })
};

