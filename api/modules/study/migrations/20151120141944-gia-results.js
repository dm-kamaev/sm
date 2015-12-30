'use strict';
const path = require('path');
const ModelArchiver = require('../../console/modules/modelArchiver/ModelArchiver.js') ;
const GiaResult = require('../../api/modules/study/models/giaResult');
const dataFolder = path.join(__dirname, '../../api/modules/study/migrations');
const async = require('asyncawait/async');
const archiveName = ModelArchiver.migrationToArchive(__filename);

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('gia_result', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            count: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            result: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            school_id: {
                onDelete: 'cascade',
                type: Sequelize.INTEGER,
                references: {
                    model: 'school',
                    key: 'id'
                }
            },
            subject_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'subject',
                    key: 'id'
                }
            },
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE
        }).then(async(function() {
            var archiver = new ModelArchiver(GiaResult, dataFolder, null, archiveName);
            archiver.load();
        }));
    },
    down: function (queryInterface) {
        return queryInterface.dropTable('gia_result');
    }
};
