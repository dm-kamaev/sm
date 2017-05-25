module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.changeColumn('program', 'description', {
            type: Sequelize.TEXT,
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.changeColumn('program', 'description', {
            type: Sequelize.STRING,
        });
    }
};
