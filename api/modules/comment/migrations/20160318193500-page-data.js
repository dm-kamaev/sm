'use strict';

const async = require('asyncawait/async'),
    path = require('path');

const Archiver = require('../../console/modules/modelArchiver/Archiver.js');

const TABLE = 'page',
    DELIMITER = '|';

module.exports = {
    up: async(function() {
        var dir = path.join(__dirname, '../../api/modules/comment/migrations'),
            file = '20160318193500-page-data.tar.gz',
            filePath = path.join(dir, file),
            archiver = new Archiver(filePath);

        archiver.fillTable(TABLE, DELIMITER);
    }),
    down: async(function(queryInterface) {

    })
};