module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'university', 'score', Sequelize.ARRAY(Sequelize.INTEGER)
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('university', 'score');
    }
};
