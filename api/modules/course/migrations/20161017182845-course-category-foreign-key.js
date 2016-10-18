'use strict';

const async = require('asyncawait/async');

module.exports = {
    up: async(function(queryInterface, Sequelize) {
        return queryInterface.addColumn('course_type', 'category_id', {
            type: Sequelize.INTEGER,
            references: {
                model: 'course_category',
                key: 'id'
            },
            onDelete: 'cascade'
        });
    }),
    down: async(function(queryInterface) {
        return queryInterface.removeColumn('category_id');
    })
};
