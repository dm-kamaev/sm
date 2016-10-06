'use strict';

const async = require('asyncawait/async'),
    path = require('path');

const Archiver = require('../../console/modules/modelArchiver/Archiver.js');

const TABLE = 'seo_school_list',
    DELIMITER = '|';

module.exports = {
    up: async(function() {
        var dir = path.join(
                __dirname,
                '../../api/modules/school/migrations'
            ),
            file = '20160628205318-seo-school-list-data.tar.gz',
            filePath = path.join(dir, file),
            archiver = new Archiver(filePath);

        archiver.fillTable(TABLE, DELIMITER);
    }),
    down: async(function(queryInterface) {
        return null;
    })
};