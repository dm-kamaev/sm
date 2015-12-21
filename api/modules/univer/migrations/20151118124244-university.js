'use strict';
const path = require('path');
const ModelArchiver = require('../../console/modules/modelArchiver/ModelArchiver.js') ;
const University = require('../../api/modules/univer/models/university');
const dataFolder = path.join(__dirname, '../../api/modules/univer/migrations');
const async = require('asyncawait/async');

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('university', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            vk_id: {
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
            var archiver = new ModelArchiver(University, dataFolder);
            archiver.load();
        }));
  },
  down: function (queryInterface) {
    return queryInterface.dropTable('university');
  }
};
