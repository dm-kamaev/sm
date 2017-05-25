module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('profile', {
            id: {
                type: Sequelize.INTEGER,
                unique: true,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
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
        return queryInterface.dropTable('profile');
    }
};
