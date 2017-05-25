module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('program', 'total_score', Sequelize.FLOAT);
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.removeColumn('program', 'total_score');
    }
};
