module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('program', 'exchange_program', {
            type: Sequelize.BOOLEAN,
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.removeColumn('program', 'exchange_program');
    }
};
