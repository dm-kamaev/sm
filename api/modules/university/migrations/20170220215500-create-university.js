module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('university', {
            id: {
                type: Sequelize.INTEGER,
                unique: true,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            abbreviation: Sequelize.STRING,
            description: Sequelize.TEXT,
            imageUrl: {
                type: Sequelize.STRING(511),
                field: 'image_url'
            },
            links: Sequelize.ARRAY(Sequelize.STRING),
            militaryDepartment: {
                type: Sequelize.BOOLEAN,
                field: 'military_department'
            },
            dormitory: Sequelize.BOOLEAN,
            cityId: {
                type: Sequelize.INTEGER,
                field: 'city_id',
                references: {
                    model: 'city',
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
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('university');
    }
};
