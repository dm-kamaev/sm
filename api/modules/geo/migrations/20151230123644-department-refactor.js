'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('department_address')
            .then(function() {
                return queryInterface.removeColumn(
                    'department',
                    'availability'
                );
            })
            .then(function() {
                return queryInterface.addColumn('department', 'address_id', {
                    type: Sequelize.INTEGER,
                    onDelete: 'cascade',
                    references: {
                        model: 'address',
                        key: 'id'
                    }
                });
            });
    },
    down: function(queryInterface, Sequelize) {
        return null; // TODO: create department back here
    }
};
