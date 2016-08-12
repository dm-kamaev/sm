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
            description: Sequelize.STRING,
            score: Sequelize.ARRAY(Sequelize.FLOAT),
            scoreCount: {
                type: Sequelize.ARRAY(Sequelize.INTEGER),
                field: 'score_count'
            },
            totalScore: {
                type: Sequelize.FLOAT,
                field: 'total_score'
            },
            'created_at': Sequelize.DATE,
            'updated_at': Sequelize.DATE
        });
    },
    down: function(queryInterface) {
        return queryInterface.dropTable('course');
    }
};
