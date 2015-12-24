'use strict';
const path = require('path');
const ModelArchiver = require('../../console/modules/modelArchiver/ModelArchiver.js') ;
const EgeResult = require('../../api/modules/study/models/egeResult');
const dataFolder = path.join(__dirname, '../../api/modules/study/migrations');
const async = require('asyncawait/async');

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('ege_result', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            year: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            result: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            school_id: {
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
            var archiver = new ModelArchiver(EgeResult, dataFolder);
            archiver.load();
        }));
    },
    down: function (queryInterface) {
        return queryInterface.dropTable('ege_result');
    }
};
