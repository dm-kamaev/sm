module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'program_major', 'popularity', Sequelize.INTEGER
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('program_major', 'popularity');
    }
};
