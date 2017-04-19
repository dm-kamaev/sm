'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('area', 'city_id',
            {
                type: Sequelize.INTEGER,
                defaultValue: 2, // Moscow id
                references: {
                    model: 'city',
                    key: 'id'
                },
            }
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn(
            'area',
            'city_id'
        );
    }
};
