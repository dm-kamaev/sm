module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('program_page', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            programId: {
                unique: true,
                allowNull: false,
                onDelete: 'cascade',
                type: Sequelize.INTEGER,
                field: 'program_id',
                references: {
                    model: 'program',
                    key: 'id'
                }
            },
            pageId: {
                unique: true,
                allowNull: false,
                onUpdate: 'cascade',
                type: Sequelize.INTEGER,
                field: 'page_id',
                references: {
                    model: 'page',
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
            },
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('program_page');
    }
};
