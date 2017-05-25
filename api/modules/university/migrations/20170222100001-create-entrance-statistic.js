module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('entrance_statistic', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            programId: {
                allowNull: false,
                onDelete: 'cascade',
                type: Sequelize.INTEGER,
                field: 'program_id',
                references: {
                    model: 'program',
                    key: 'id'
                }
            },
            year: {
                type: Sequelize.INTEGER,
            },
            competition: {
                type: Sequelize.INTEGER,
            },
            budget_places: {
                type: Sequelize.INTEGER,
            },
            commercial_places: {
                type: Sequelize.INTEGER,
            },
            cost: {
                type: Sequelize.INTEGER,
            },
            discount: {
                type: Sequelize.BOOLEAN,
            },
            ege_pass_score: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                field: 'created_at',
                type: Sequelize.DATE
            },
            updatedAt: {
                field: 'updated_at',
                type: Sequelize.DATE
            },
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('entrance_statistic');
    }
};
