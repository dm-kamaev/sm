'use strict';
const path = require('path');
const ModelArchiver = require('../../console/modules/modelArchiver/ModelArchiver.js');
const Department = require('../../api/modules/geo/models/department');
const dataFolder = path.join(__dirname, '../../api/modules/geo/migrations');
const archive = ModelArchiver.migrationToArchive(__filename);
const await = require('asyncawait/await');
const async = require('asyncawait/async');
var sequelize = require.main.require('../../../app/components/db');
module.exports = {
    up: async(function (queryInterface, Sequelize) {
        var sqlString = 'DELETE FROM address WHERE address.id IN (3666,3683);';
        await(sequelize.query(
            sqlString,
            {
                type: sequelize.QueryTypes.DELETE
            }
        ));
        var archiver = new ModelArchiver(Department, dataFolder, null, archive);
        await(archiver.load());
    }),
    down: function () {
        return null;
    }
};
