'use strict';
var colors = require('colors'),
    searchType = require('../../api/modules/school/enums/searchType');
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('search_data', {
            id: { 
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            school_id: {
                type: Sequelize.INTEGER,
                onDelete: 'cascade',
                references: {
                    model:'school',
                    key: 'id',
                }
            },
            values: {
                type: Sequelize.ARRAY(Sequelize.INTEGER)
            },
            type: {
                type: Sequelize.ENUM,
                values: searchType.toArray() 
            },
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE
        }).then(function() {
            console.log('*****************');
            console.log('\tSearch table created. Please run ' +
                colors.yellow('"node commander search" ' +
                'to update search indexes'));
            console.log('*****************');
        });
    },
    down: function (queryInterface) {
        return queryInterface.dropTable('search_data');
    }
};
