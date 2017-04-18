module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('university_profile', {
            id: {
                type: Sequelize.INTEGER,
                unique: true,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            universityId: {
                field: 'university_id',
                type: Sequelize.INTEGER,
                references: {
                    model: 'university',
                    key: 'id'
                },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            },
            profileId: {
                field: 'profile_id',
                type: Sequelize.INTEGER,
                references: {
                    model: 'profile',
                    key: 'id'
                },
                onDelete: 'cascade',
                onUpdate: 'cascade'
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
        return queryInterface.dropTable('university_profile');
    }
};
