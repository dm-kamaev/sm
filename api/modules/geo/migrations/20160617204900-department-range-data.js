'use strict';

const path = require('path');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

const sequelize = require('../../app/components/db');
const Archiver = require('../../console/modules/modelArchiver/Archiver');

const DELIMITER = ',';

module.exports = {
    up: async(function() {
        var dir = path.join(__dirname, '../../api/modules/geo/migrations'),
            file = '20160617204900-department-range-data.tar.gz',
            archiver = new Archiver(path.join(dir, file));

        sequelize.options.logging = false;

        archiver.updateTable('department', DELIMITER, ['id']);

        var sqlQuery = 'DELETE FROM department ' +
            'WHERE educational_grades is null;';
        await(sequelize.query(sqlQuery, {type: sequelize.QueryTypes.DELETE}));
    }),
    down: function() {
        return null;
    }
};
