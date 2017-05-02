module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'program',
            'okso_code',
            Sequelize.STRING
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn(
            'program',
            'okso_code',
            Sequelize.STRING
        );
    }
};
