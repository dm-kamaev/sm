module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('program_major_course_type', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            programMajorId: {
                field: 'program_major_id',
                type: Sequelize.INTEGER,
                references: {
                    model: 'program_major',
                    key: 'id'
                },
                onDelete: 'cascade'
            },
            courseTypeId: {
                field: 'course_type_id',
                type: Sequelize.INTEGER,
                references: {
                    model: 'course_type',
                    key: 'id'
                },
                onDelete: 'cascade'
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
        return queryInterface.dropTable('program_major_course_type');
    }
};
