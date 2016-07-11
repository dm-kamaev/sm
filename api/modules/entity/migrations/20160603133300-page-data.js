'use strict';

const await = require('asyncawait/await'),
    async = require('asyncawait/async'),
    path = require('path'),
    sequelize = require('../../app/components/db');

const Archiver = require('../../console/modules/modelArchiver/Archiver.js');

const TABLE = 'page',
    DELIMITER = '|';

module.exports = {
    up: async(function() {
        var pages = await(sequelize.query('SELECT COUNT(*) FROM page;'));
        if (!pages) {
            var dir = path.join(
                __dirname,
                '../../api/modules/entity/migrations'
                ),
                file = '20160603133300-page-data.tar.gz',
                filePath = path.join(dir, file),
                archiver = new Archiver(filePath);

            archiver.fillTable(TABLE, DELIMITER);
        }
    }),
    down: async(function(queryInterface) {

    })
};
