'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.addColumn('user_data', 'kid_grade', {
            type: Sequelize.INTEGER
        });
        queryInterface.addColumn('user_data', 'pupil_grade', {
            type: Sequelize.INTEGER
        });
    },
    down: function (queryInterface) {
        queryInterface.removeColumn('user_data', 'kid_grade');
        queryInterface.removeColumn('user_data', 'pupil_grade');
    }
};
