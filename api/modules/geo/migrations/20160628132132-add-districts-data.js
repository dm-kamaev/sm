'use strict';

const await = require('asyncawait/await'),
    async = require('asyncawait/async'),
    path = require('path'),
    sequelize = require('../../app/components/db');

const Archiver = require('../../console/modules/modelArchiver/Archiver.js');

const TABLE = 'district',
    DELIMITER = '|';

module.exports = {
    up: async(function() {
        var dir = path.join(
                __dirname,
                '../../api/modules/geo/migrations'
            ),
            file = '20160628132132-add-districts-data.tar.gz',
            filePath = path.join(dir, file),
            archiver = new Archiver(filePath);

        archiver.fillTable(TABLE, DELIMITER);
    }),
    down: async(function(queryInterface) {

    })
};
