'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('course', 'embed_id', {
            type: Sequelize.STRING
        });
    },
    down: function(queryInterface) {
        return queryInterface.removeColumn('course', 'embed_id');
    }
};
