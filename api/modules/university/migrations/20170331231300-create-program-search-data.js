module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('program_search_data', {
            id: {
                type: Sequelize.INTEGER,
                unique: true,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            programId: {
                type: Sequelize.INTEGER,
                field: 'program_id',
                references: {
                    model: 'program',
                    key: 'id'
                },
                onDelete: 'cascade'
            },
            values: Sequelize.ARRAY(Sequelize.INTEGER),
            type: Sequelize.STRING,
            createdAt: {
                field: 'created_at',
                type: Sequelize.DATE
            },
            updatedAt: {
                field: 'updated_at',
                type: Sequelize.DATE
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('program_search_data');
    }
};
