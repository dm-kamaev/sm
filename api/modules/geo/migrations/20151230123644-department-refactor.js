'use strict';
const path = require('path');
const ModelArchiver = require('../../console/modules/modelArchiver/ModelArchiver.js') ;
const Department = require('../../api/modules/geo/models/department');
const dataFolder = path.join(__dirname, '../../api/modules/geo/migrations');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const archiveName = ModelArchiver.migrationToArchive(__filename);

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('department_address')
            .then(function() {
                return queryInterface.removeColumn('department', 'availability')
                    .then(function() {
                        return queryInterface.addColumn('department', 'address_id', {
                            type: Sequelize.INTEGER,
                            onDelete: 'cascade',
                            references: {
                                model: 'address',
                                key: 'id'
                            }
                        });
                    });
            }).then(async(function() {
                var archiver = new ModelArchiver(Department, dataFolder, null, archiveName);
                await(archiver.load());
            }));
    },
    down: function (queryInterface, Sequelize) {
        return null; //TODO: create department back here
    }
};
