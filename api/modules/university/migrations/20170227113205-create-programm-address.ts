module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('program_address', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            addressId: {
                allowNull: false,
                unique: true,
                onDelete: 'cascade',
                type: Sequelize.INTEGER,
                field: 'address_id',
                references: {
                    model: 'address',
                    key: 'id'
                }
            },
            programId: {
                allowNull: false,
                unique: true,
                onDelete: 'cascade',
                type: Sequelize.INTEGER,
                field: 'program_id',
                references: {
                    model: 'program',
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
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('program_address');
    }
};
