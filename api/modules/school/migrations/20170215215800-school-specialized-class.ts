module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('school_specialized_class', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            school_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'school',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            specialized_class_type_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'specialized_class_type',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            class: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            'created_at': Sequelize.DATE,
            'updated_at': Sequelize.DATE
        });
    },
    down: function(queryInterface) {
        return queryInterface.dropTable('school_specialized_class');
    }
};
