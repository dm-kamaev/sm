'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('address', 'area_id', {
            type: Sequelize.INTEGER,
            references: {
                model: 'area',
                key: 'id'
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return db.dropColumn('address', 'area_id');
    }
};
