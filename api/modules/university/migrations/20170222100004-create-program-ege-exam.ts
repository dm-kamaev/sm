module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('program_ege_exam', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            subjectId: {
                allowNull: false,
                onDelete: 'cascade',
                type: Sequelize.INTEGER,
                field: 'subject_id',
                references: {
                    model: 'subject',
                    key: 'id'
                }
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
            isMain: {
                type: Sequelize.BOOLEAN,
                field: 'is_main',
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
        return queryInterface.dropTable('program_ege_exam');
    }
};
