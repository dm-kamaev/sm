'use strict';
const path = require('path');
const await = require('asyncawait/await');
const async = require('asyncawait/async');

var sequelize = require.main.require('../../../app/components/db');
const ModelArchiver = require(
    '../../console/modules/modelArchiver/ModelArchiver.js');
const School = require('../../api/modules/school/models/school');

module.exports = {
    up: async(function () {
        var dir = path.join(__dirname, '../../api/modules/school/migrations'),
            file = '20160318225400-updated-data.tar.gz',
            archiver = new ModelArchiver(School, dir, null, file);

        archiver.load();
    }),
    down: function () {
        return null;
    }
};
