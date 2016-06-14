'use strict';

const async = require('asyncawait/async');

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('city_result').then(
        function() {
            return queryInterface.createTable('city_result', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                'city_id': {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'city',
                        key: 'id',
                    }
                },
                'subject_id': {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'subject',
                        key: 'id',
                    }
                },
                result: {
                    type: Sequelize.FLOAT,
                },
                year: {
                    type: Sequelize.INTEGER
                },
                type: {
                    type: Sequelize.ENUM,
                    values: ['ege', 'gia']
                },
                'created_at': Sequelize.DATE,
                'updated_at': Sequelize.DATE
            }).then(async(function() {
                // var archiver = new ModelArchiver(CityResult, dataFolder);
                // archiver.load(); //TODO: chained data load
            }));
        });
    },
    down: function(queryInterface) {
        return null; // TODO: implement me
    }
};
