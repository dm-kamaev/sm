module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'university', 'score_count', Sequelize.ARRAY(Sequelize.INTEGER)
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('university', 'score_count');
    }
};
