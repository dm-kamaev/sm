'use strict';

const categoryPrice = require('../../api/modules/course/enums/categoryPrice');

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('course_category', 'price_type', {
            type: Sequelize.STRING,
            defaultValue: categoryPrice.COST_PER_HOUR
        });
    },
    down: function(queryInterface) {
        return queryInterface.removeColumn('course_category', 'price_type');
    }
};
