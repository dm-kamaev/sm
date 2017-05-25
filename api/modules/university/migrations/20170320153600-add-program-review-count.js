module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('program', 'review_count', Sequelize.INTEGER);
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.removeColumn('program', 'review_count');
    }
};
