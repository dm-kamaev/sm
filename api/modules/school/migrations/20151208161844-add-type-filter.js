'use strict';
const searchType = require('../../api/modules/school/enums/searchType');

const path = require('path');
const ModelArchiver = require('../../console/modules/modelArchiver/ModelArchiver.js') ;
const SchoolTypeFilter = require('../../api/modules/school/models/schoolTypeFilter');
const dataFolder = path.join(__dirname, '../../api/modules/school/migrations');
const async = require('asyncawait/async');
const archiveName = ModelArchiver.migrationToArchive(__filename);

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('school_type_filter', {
            id: { 
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
            },
            values: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                values: searchType.toArray()
                
            },
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE
        }).then(async(function() {
            var archiver = new ModelArchiver(SchoolTypeFilter, dataFolder, null, archiveName);
            archiver.load();
        }));
    },
    down: function (queryInterface) {
        return queryInterface.dropTable('school_type_filter');
    }
};
