'use strict';
const path = require('path');
const ModelArchiver = require('../../console/modules/modelArchiver/ModelArchiver.js') ;
const Subject = require('../../api/modules/study/models/subject');
const dataFolder = path.join(__dirname, '../../api/modules/study/migrations');
const async = require('asyncawait/async');

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('subject', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                unique: true
            },
            display_name: {
                type: Sequelize.STRING
            },
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE
        }).then(async(function() {
            var archiver = new ModelArchiver(Subject, dataFolder);
            archiver.load();
        }));
    },
    down: function (queryInterface) {
        return queryInterface.dropTable('subject');
    }
};
