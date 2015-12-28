'use strict';
const path = require('path');
const ModelArchiver = require('../../console/modules/modelArchiver/ModelArchiver.js') ;
const AddressMetro = require('../../api/modules/geo/models/addressMetro');
const dataFolder = path.join(__dirname, '../../api/modules/geo/migrations');
const async = require('asyncawait/async');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('address_metro', {
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
                model:'address',
                key: 'id',
            }
        },
        created_at: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updated_at: {
            allowNull: false,
            type: Sequelize.DATE
        },
        metro_id: {
            type: Sequelize.INTEGER,
            onDelete: 'cascade',
            references: {
                model:'metro',
                key: 'id',
            }
        }
    }).then(async(function() {
        var archiver = new ModelArchiver(AddressMetro, dataFolder);
        archiver.load();
    }));
  },
    down: function (queryInterface) {
        return queryInterface.dropTable('address_metro');
    }
};
