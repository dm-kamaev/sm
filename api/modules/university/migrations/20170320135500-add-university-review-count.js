module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('university', 'review_count', Sequelize.INTEGER);
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.removeColumn('university', 'review_count');
    }
};
