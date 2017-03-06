module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn(
            'program',
            'discount'
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('program', 'discount',
            {
                type: Sequelize.BOOLEAN,
            }
        );
    }
};