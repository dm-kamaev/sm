module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'program', 'score', Sequelize.ARRAY(Sequelize.INTEGER)
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('program', 'score');
    }
};
