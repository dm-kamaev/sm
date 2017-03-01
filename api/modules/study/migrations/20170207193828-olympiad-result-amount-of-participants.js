'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('olimp_result', 'awardee_amount', {
            type: Sequelize.INTEGER,
        });
    },
    down: function(queryInterface) {
        return queryInterface.removeColumn('olimp_result', 'awardee_amount');
    }
};
