'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'comment',
            'username',
            {
                type: Sequelize.STRING
            }
        );
    },
    down: function (queryInterface) {
        return queryInterface.removeColumn('comment', 'username');
    }
};
