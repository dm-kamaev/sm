module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('university');
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.createTable('university', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: Sequelize.STRING,
            'vk_id': Sequelize.INTEGER,
            'created_at': Sequelize.DATE,
            'updated_at': Sequelize.DATE
        });
    }
};
