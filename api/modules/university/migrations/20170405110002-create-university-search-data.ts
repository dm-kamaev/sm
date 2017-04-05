module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('university_search_data', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            universityId: {
                type: Sequelize.INTEGER,
                field: 'university_id',
                references: {
                    model: 'university',
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
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('university_search_data');
    }
};
