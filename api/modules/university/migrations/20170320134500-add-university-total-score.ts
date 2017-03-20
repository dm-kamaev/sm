module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'university', 'total_score', Sequelize.INTEGER
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('university', 'total_score');
    }
};
