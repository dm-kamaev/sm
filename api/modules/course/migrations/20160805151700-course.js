'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('course', {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            name: Sequelize.STRING,
            brandId: {
                type: Sequelize.INTEGER,
                field: 'brand_id',
                references: {
                    model: 'course_brand',
                    key: 'id',
                },
                onDelete: 'cascade'
            },
            type: Sequelize.STRING,
            description: Sequelize.STRING,
            fullDescription: {
                type: Sequelize.TEXT,
                field: 'full_description'
            },
            about: Sequelize.STRING,
            entranceExam: {
                type: Sequelize.TEXT,
                field: 'entrance_exam'
            },
            learningOutcome: {
                type: Sequelize.TEXT,
                field: 'learning_outcome'
            },
            leadType: {
                type: Sequelize.STRING,
                field: 'lead_type'
            },
            score: Sequelize.ARRAY(Sequelize.FLOAT),
            scoreCount: {
                type: Sequelize.ARRAY(Sequelize.INTEGER),
                field: 'score_count'
            },
            totalScore: {
                type: Sequelize.FLOAT,
                field: 'total_score',
                defaultValue: 0
            },
            'created_at': Sequelize.DATE,
            'updated_at': Sequelize.DATE
        });
    },
    down: function(queryInterface) {
        return queryInterface.dropTable('course');
    }
};
