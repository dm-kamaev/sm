'use strict';

const path = require('path');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

const ModelArchiver = require(
    '../../console/modules/modelArchiver/ModelArchiver.js');
const Department = require('../../api/modules/geo/models/department');
const sequelize = require('../../app/components/db');

module.exports = {
    up: async(function() {
        var dir = path.join(__dirname, '../../api/modules/geo/migrations'),
            file = '20160617204900-department-range-data.tar.gz',
            archiver = new ModelArchiver(Department, dir, null, file);

        archiver.load();

        var sqlQuery = 'DELETE FROM department ' +
            'WHERE educational_grades is null;';
        await(sequelize.query(sqlQuery, {type: sequelize.QueryTypes.DELETE}));
    }),
    down: function() {
        return null;
    }
};
