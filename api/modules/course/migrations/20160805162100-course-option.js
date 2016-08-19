'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('course_option', {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            courseId: {
                type: Sequelize.INTEGER,
                field: 'course_id',
                references: {
                    model: 'course',
                    key: 'id',
                },
                onDelete: 'cascade'
            },
            costPerHour: {
                type: Sequelize.INTEGER,
                field: 'cost_per_hour'
            },
            online: Sequelize.BOOLEAN,
            age: Sequelize.ARRAY(Sequelize.FLOAT),
            maxGroupSize: {
                type: Sequelize.INTEGER,
                field: 'max_group_size'
            },
            nativeSpeaker: {
                type: Sequelize.BOOLEAN,
                field: 'native_speaker'
            },
            startDate: {
                type: Sequelize.DATEONLY,
                field: 'start_date'
            },
            duration: Sequelize.FLOAT,
            'created_at': Sequelize.DATE,
            'updated_at': Sequelize.DATE
        });
    },
    down: function(queryInterface) {
        return queryInterface.dropTable('course_option');
    }
};
