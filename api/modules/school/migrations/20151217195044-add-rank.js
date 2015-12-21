'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('school', 'rank', Sequelize.STRING);
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.removeColumn('school', 'rank');
    }
};
