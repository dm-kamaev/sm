module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('program', 'program_major_id', {
            allowNull: false,
            onUpdate: 'cascade',
            type: Sequelize.INTEGER,
            references: {
                model: 'program_major',
                key: 'id'
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.removeColumn('program', 'program_major_id');
    }
};
