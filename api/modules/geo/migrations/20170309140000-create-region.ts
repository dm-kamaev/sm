module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('region', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            name: {
                unique: true,
                allowNull: false,
                type: Sequelize.STRING,
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
        return queryInterface.dropTable('region');
    }
};
