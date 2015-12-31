'use strict';
const path = require('path');
const ModelArchiver = require('../../console/modules/modelArchiver/ModelArchiver.js') ;
const Address = require('../../api/modules/geo/models/address');
const dataFolder = path.join(__dirname, '../../api/modules/geo/migrations');
const async = require('asyncawait/async');
const archiveName = ModelArchiver.migrationToArchive(__filename);

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('address', {
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
        },
        coords: {
            type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.FLOAT))
        },
        school_id: {
            type: Sequelize.INTEGER,
            onDelete: 'cascade',
            references: {
                model: 'school',
                key: 'id'
            }
        },
        area_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'area',
                key: 'id'
            }
        }
    }).then(async(function() {
        var archiver = new ModelArchiver(Address, dataFolder, null, archiveName);
        archiver.load();
    }));
  },
  down: function (queryInterface) {
    return queryInterface.dropTable('address');
  }
};
