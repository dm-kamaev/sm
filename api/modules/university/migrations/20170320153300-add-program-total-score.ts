module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'program', 'total_score', Sequelize.INTEGER
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('program', 'total_score');
    }
};
