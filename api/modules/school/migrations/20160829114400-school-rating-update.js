'use strict';

const path = require('path'),
    async = require('asyncawait/async');

const Archiver = require('../../console/modules/modelArchiver/Archiver.js');

const TABLE = 'school',
    DELIMITER = ',';

module.exports = {
    up: async(function(queryInterface, Sequielize) {
        var dir = path.join(
                __dirname,
                '../../api/modules/school/migrations'
            ),
            file = '20160829114400-school-rating-update.tar.gz',
            filePath = path.join(dir, file),
            archiver = new Archiver(filePath);

        archiver.updateTable(TABLE, DELIMITER, ['id']);
    }),
    down: async(function(queryInterface, Sequielize) {
        return null;
    })
};
