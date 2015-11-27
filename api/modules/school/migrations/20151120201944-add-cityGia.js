module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('city_gia', {
            id: { 
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            city_id: {
                type: Sequelize.INTEGER,
                references: {
                    model:"city",
                    key: "id",
                }
            },
            subject_id: {
                type: Sequelize.INTEGER,
                references: {
                    model:"subject",
                    key: "id",
                }
            },
            gia_result: {
                type: Sequelize.FLOAT,
            },        
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('city_gia');
    }
};
