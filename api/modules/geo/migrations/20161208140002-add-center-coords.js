'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('area', 'center_coords',
            { type: Sequelize.ARRAY(Sequelize.FLOAT) }
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn(
            'area',
            'center_coords'
        );
    }
};
