'use strict';
const path = require('path');
const ModelArchiver = require('../../console/modules/modelArchiver/ModelArchiver.js') ;
const School = require('../../api/modules/school/models/school');
const dataFolder = path.join(__dirname, '../../api/modules/school/migrations');
const archiveName = ModelArchiver.migrationToArchive(__filename);
const async = require('asyncawait/async');
const await = require('asyncawait/await');

module.exports = {
    up: async(function () {
        var archiver = new ModelArchiver(School, dataFolder, null, archiveName);
        await(archiver.load());
    }),
    down: function () {
        return null;
    }
};
