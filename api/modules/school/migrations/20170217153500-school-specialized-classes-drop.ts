module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('school', 'specialized_classes');
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'school',
            'specialized_classes', {
                type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.INTEGER))
            }
        );
    }
};
