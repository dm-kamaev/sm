'use strict';
const olimpType = require('../../api/modules/study/enums/olimpType'),
    olimpStatusType = require('../../api/modules/study/enums/olimpStatusType');

const path = require('path');
const ModelArchiver = require('../../console/modules/modelArchiver/ModelArchiver.js') ;
const OlimpResult = require('../../api/modules/study/models/olimpResult');
const dataFolder = path.join(__dirname, '../../api/modules/study/migrations');
const async = require('asyncawait/async');

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('olimp_result', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
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
            type: {
                type: Sequelize.ENUM,
                values: olimpType.toArray()
            },
            stage: {
                type: Sequelize.INTEGER
            },
            class: {
                type: Sequelize.INTEGER
            },
            status: {
                type: Sequelize.ENUM,
                values: olimpStatusType.toArray()
            },
            year: {
                type: Sequelize.INTEGER
            },
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE
        }).then(async(function() {
            var archiver = new ModelArchiver(OlimpResult, dataFolder);
            archiver.load();
        }));
    },
    down: function (queryInterface) {
        return queryInterface.dropTable('olimp_result');
    }
};
