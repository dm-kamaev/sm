'use strict';

const await = require('asyncawait/await'),
    async = require('asyncawait/async'),
    path = require('path'),
    fs = require('fs'),
    sequelize = require('../../app/components/db');

const Archiver = require('../../console/modules/modelArchiver/Archiver.js');

module.exports = {
    up: async(function() {
        var dir = path.join(__dirname, '../../api/modules/school/migrations'),
            file = '20160528165600-additional-education-data.tar.gz',
            headersFile =
                '20160528165600-additional-education-data-headers.json',
            filePath = path.join(dir, file),
            archiver = new Archiver(filePath),
            headers = JSON.parse(
                fs.readFileSync(path.join(dir, headersFile), 'utf8')
            );

        archiver.decompress(dir);

        var sqlQuery = 'COPY additional_education(' + headers.join() +
            ') FROM \'' + dir + '/' + archiver.tmpName +
            '\' WITH CSV HEADER DELIMITER \'|\';';

        await(sequelize.query(sqlQuery));

        archiver.deleteUnarchivedFile(dir);
    }),
    down: async(function(queryInterface) {

    })
};
