'use strict';

const path = require('path'),
    async = require('asyncawait/async');

const Archiver = require('../../console/modules/modelArchiver/Archiver.js');

const TABLE = 'seo_school_list',
    DELIMITER = '|';

module.exports = {
    up: async(function(queryInterface, Sequielize) {
        var dir = path.join(
                __dirname,
                '../../api/modules/school/migrations'
            ),
            file = '20160720184112-seo-school-lists-texts.tar.gz',
            filePath = path.join(dir, file),
            archiver = new Archiver(filePath);

        archiver.updateTable(TABLE, DELIMITER, ['id']);
    }),
    down: async(function(queryInterface, Sequielize) {
        return null;
    })
};
