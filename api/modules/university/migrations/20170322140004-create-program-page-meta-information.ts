module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('program_page_meta_information', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            programId: {
                type: Sequelize.INTEGER,
                onDelete: 'cascade',
                field: 'program_id',
                references: {
                    model: 'program',
                    key: 'id'
                }
            },
            pageMetaInformation: {
                onDelete: 'cascade',
                type: Sequelize.INTEGER,
                field: 'page_meta_information_id',
                references: {
                    model: 'page_meta_information',
                    key: 'id'
                }
            },
            keywords: {
                type: Sequelize.TEXT,
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
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('program_page_meta_information');
    }
};
