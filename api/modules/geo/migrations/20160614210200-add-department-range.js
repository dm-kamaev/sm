'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'department',
            'educational_grades', {
                type: Sequelize.ARRAY(Sequelize.INTEGER)
            }
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn(
            'department',
            'educational_grades'
        );
    }
};
