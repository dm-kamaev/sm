'use strict';

const async = require('asyncawait/async');

module.exports = {
    up: async(function(queryInterface, Sequelize) {
        return queryInterface.changeColumn('seo_course_list', 'text', {
            type: Sequelize.ARRAY(Sequelize.TEXT)
        });
    }),
    down: async(function(queryInterface, Sequelize) {
        return queryInterface.changeColumn('seo_course_list', 'text', {
            type: Sequelize.ARRAY(Sequelize.STRING)
        });
    })
};
