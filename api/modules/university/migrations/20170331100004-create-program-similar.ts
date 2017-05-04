module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('program_similar', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            mainProgramId: {
                allowNull: false,
                onDelete: 'cascade',
                type: Sequelize.INTEGER,
                field: 'main_program_id',
                references: {
                    model: 'program',
                    key: 'id'
                }
            },
            relatedProgramId: {
                allowNull: false,
                onDelete: 'cascade',
                type: Sequelize.INTEGER,
                field: 'related_program_id',
                references: {
                    model: 'program',
                    key: 'id'
                }
            },
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
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('program_similar');
    }
};
