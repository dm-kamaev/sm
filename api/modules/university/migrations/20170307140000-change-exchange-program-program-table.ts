module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.changeColumn('program', 'exchange_program', {
            type: Sequelize.STRING,
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.changeColumn('program', 'exchange_program', {
            type: Sequelize.BOOLEAN,
        });
    }
};
