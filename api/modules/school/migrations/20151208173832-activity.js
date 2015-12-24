'use strict';
const path = require('path');
const ModelArchiver = require('../../console/modules/modelArchiver/ModelArchiver.js') ;
const Activity = require('../../api/modules/school/models/activity');
const dataFolder = path.join(__dirname, '../../api/modules/school/migrations');
const async = require('asyncawait/async');

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('activity', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            direction: {
                type: Sequelize.STRING,
            },
            profile: {
                type: Sequelize.STRING,
            },
            type: {
                type: Sequelize.STRING,
            },
            name: {
                type: Sequelize.STRING,
            },
            school_id: {
                onDelete: 'cascade',
                type: Sequelize.INTEGER,
                references: {
                    model: 'school',
                    key: 'id',
                }
            },
        }).then(async(function() {
            var archiver = new ModelArchiver(Activity, dataFolder);
            archiver.load();
        }));
    },
    down: function (queryInterface) {
        return queryInterface.dropTable('activity');
    }
};
