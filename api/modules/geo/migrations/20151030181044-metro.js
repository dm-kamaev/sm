'use strict';
const path = require('path');
const ModelArchiver = require('../../console/modules/modelArchiver/ModelArchiver.js') ;
const Metro = require('../../api/modules/geo/models/metro.js');
const dataFolder = path.join(__dirname, '../../api/modules/geo/migrations');
const async = require('asyncawait/async');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('metro', {
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
            type: Sequelize.STRING,
            unique: true,
        },
        coords: {
            type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.FLOAT)),
        },
        address_id: {
            type: Sequelize.INTEGER,
            references: {
                model:'address',
                key: 'id',
            }
        }
    }).then(async(function() {
        var archiver = new ModelArchiver(Metro, dataFolder);
        archiver.load();
    }));
  },
  down: function (queryInterface) {
    return queryInterface.dropTable('metro');
  }
};
