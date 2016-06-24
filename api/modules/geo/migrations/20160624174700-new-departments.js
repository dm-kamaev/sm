'use strict';

const async = require('asyncawait/async'),
    path = require('path');

const Archiver = require('../../console/modules/modelArchiver/Archiver.js');

const TABLE = 'department',
    DELIMITER = '|';

module.exports = {
    up: async(function() {
        var dir = path.join(
            __dirname,
            '../../api/modules/geo/migrations'
            ),
            file = '20160624174700-new-departments.tar.gz',
            filePath = path.join(dir, file),
            archiver = new Archiver(filePath);

        archiver.copyToDb(TABLE, DELIMITER);
    }),
    down: async(function(queryInterface) {

    })
};
