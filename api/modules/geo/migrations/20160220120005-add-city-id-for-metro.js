'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('metro', 'city_id',
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
            'metro',
            'city_id'
        );
    }
};
