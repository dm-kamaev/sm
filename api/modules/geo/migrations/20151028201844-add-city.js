'use strict';
const path = require('path');
const ModelArchiver = require('../../console/modules/modelArchiver/ModelArchiver.js') ;
const City = require('../../api/modules/geo/models/city');
const dataFolder = path.join(__dirname, '../../api/modules/geo/migrations');
const archiveName = ModelArchiver.migrationToArchive(__filename);
const async = require('asyncawait/async');
const await = require('asyncawait/await');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('city', {
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
        var archiver = new ModelArchiver(City, dataFolder, null, archiveName);
        await(archiver.load());
    }));
  },
  down: function (queryInterface) {
    return queryInterface.dropTable('city');
  }
};
