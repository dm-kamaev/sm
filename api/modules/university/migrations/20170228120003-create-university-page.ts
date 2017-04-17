module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('university_page', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            universityId: {
                allowNull: false,
                onDelete: 'cascade',
                type: Sequelize.INTEGER,
                field: 'university_id',
                references: {
                    model: 'university',
                    key: 'id'
                }
            },
            pageId: {
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
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('university_page');
    }
};
