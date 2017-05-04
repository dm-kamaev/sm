module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('program', 'phone', Sequelize.STRING);
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('program', 'phone');
    }
};
