'use strict';
const path = require('path');
const ModelArchiver = require('../../console/modules/modelArchiver/ModelArchiver.js') ;
const City = require('../../api/modules/geo/models/city');
const dataFolder = path.join(__dirname, '../../api/modules/geo/migrations');
const async = require('asyncawait/async');

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
            allowNull: false,
            type: Sequelize.DATE
        },
        updated_at: {
            allowNull: false,
            type: Sequelize.DATE
        },
        name: {
            type: Sequelize.STRING
        }
    }).then(async(function() { 
        var archiver = new ModelArchiver(City, dataFolder);
        archiver.load();
    }));
  },
  down: function (queryInterface) {
    return queryInterface.dropTable('city');
  }
};
