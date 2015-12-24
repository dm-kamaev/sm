'use strict';
const path = require('path');
const ModelArchiver = require('../../console/modules/modelArchiver/ModelArchiver.js') ;
const Area = require('../../api/modules/geo/models/area');
const dataFolder = path.join(__dirname, '../../api/modules/geo/migrations');
const async = require('asyncawait/async');

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('area', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                created_at: {
                    type: Sequelize.DATE
                },
                updated_at: {
                    type: Sequelize.DATE
                },
                name: {
                    type: Sequelize.STRING
                }
            }).then(async(function() { 
                var archiver = new ModelArchiver(Area, dataFolder);
            archiver.load();
        }));
    },
    down: function (queryInterface) {
        return queryInterface.dropTable(
            'area'
        );
    }
};
