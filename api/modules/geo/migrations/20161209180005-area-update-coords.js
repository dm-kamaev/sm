'use strict';

const path = require('path'),
    async = require('asyncawait/async');

const Archiver = require('../../console/modules/modelArchiver/Archiver.js');

const TABLE = 'area';
const DELIMITER = '|';

module.exports = {
    up: async(function(queryInterface, Sequielize) {
        var dir = path.join(
                __dirname,
                '../../api/modules/geo/migrations'
            ),
            file = '20161209170000-area-update-coords.tar.gz',
            filePath = path.join(dir, file),
            archiver = new Archiver(filePath);

        archiver.updateTable(TABLE, DELIMITER, ['id']);
    }),
    down: async(function(queryInterface, Sequielize) {
        return null;
    })
};
