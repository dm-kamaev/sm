'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('rating', 'school_id');
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('rating', 'school_id', {
            type: Sequelize.INTEGER,
            references: {
                model: 'school',
                key: 'id'
            },
            onDelete: 'cascade'
        });
    }
};
