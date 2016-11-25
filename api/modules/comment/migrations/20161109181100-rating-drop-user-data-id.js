'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('rating', 'user_data_id');
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('rating', 'user_data_id', {
            type: Sequelize.INTEGER,
            references: {
                model: 'user_data',
                key: 'id'
            }
        });
    }
};
