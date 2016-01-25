'use strict';
const path = require('path');
const ModelArchiver = require('../../console/modules/modelArchiver/ModelArchiver.js') ;
const Activity = require('../../api/modules/school/models/activity');
const dataFolder = path.join(__dirname, '../../api/modules/school/migrations');
const archiveName = ModelArchiver.migrationToArchive(__filename);
const await = require('asyncawait/await');
const async = require('asyncawait/async');
module.exports = {
    up: async(function () {
        var archiver = new ModelArchiver(Activity, dataFolder, null, archiveName);
        await(archiver.load());
    }),
    down: function () {
        return null;
    }
};
