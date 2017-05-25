'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('city', 'region_id', {
            onUpdate: 'cascade',
            type: Sequelize.INTEGER,
            references: {
                model: 'region',
                key: 'id'
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.removeColumn('city', 'region_id');
    }
};
