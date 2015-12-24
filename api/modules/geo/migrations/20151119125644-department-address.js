'use strict';

const path = require('path');
const async = require('asyncawait/async');
const ModelArchiver = require('../../console/modules/modelArchiver/ModelArchiver.js') ;
const DepartmentAddress = require('../../api/modules/geo/models/department_address');
const dataFolder = path.join(__dirname, '../../api/modules/geo/migrations');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('department_address', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        address_id: {
            type: Sequelize.INTEGER,
            onDelete: 'cascade',
            references: {
                model: 'address',
                key: 'id'
            }
        },
        department_id: {
            type: Sequelize.INTEGER,
            onDelete: 'cascade',
            references: {
                model: 'department',
                key: 'id'
            }
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
    }).then(async(function() {
        var archiver = new ModelArchiver(DepartmentAddress, dataFolder);
        archiver.load();
    }));
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('department_address');
  }
};
