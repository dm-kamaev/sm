module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.changeColumn(
            'entrance_statistic',
            'competition', {
            type: Sequelize.FLOAT,
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.changeColumn(
            'entrance_statistic',
            'competition', {
            type: Sequelize.INTEGER,
        });
    }
};
