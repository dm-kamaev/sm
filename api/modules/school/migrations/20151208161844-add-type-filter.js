'use strict';

const searchType = require('../../api/modules/school/enums/searchType');


module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('school_type_filter', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: Sequelize.STRING,
            values: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                values: searchType.toArray()
            },
            'created_at': Sequelize.DATE,
            'updated_at': Sequelize.DATE
        });
    },
    down: function(queryInterface) {
        return queryInterface.dropTable('school_type_filter');
    }
};
