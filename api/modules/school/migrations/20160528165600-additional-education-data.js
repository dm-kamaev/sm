'use strict';

var fs = require('fs');
var Converter = require("csvtojson").Converter;
const await = require('asyncawait/await'),
      async = require('asyncawait/async'),
      path  = require('path'),
      sequelize = require('../../app/components/db');

const Archiver = require('../../console/modules/modelArchiver/Archiver.js');
const AdditionalEducation =
    require('../../api/modules/school/models/additionalEducation.js');

module.exports = {
    up: async(function() {
        var dir = path.join(__dirname, '../../api/modules/school/migrations'),
            file = '20160528165600-additional-education-data.tar.gz',
            headersFile =
                '20160528165600-additional-education-data-headers.json',
            filePath = path.join(dir, file),
            archiver = new Archiver(filePath),
            headers = require(path.join(dir, headersFile));

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
