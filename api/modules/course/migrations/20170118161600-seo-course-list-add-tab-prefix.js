'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'seo_course_list',
            'page_prefix_tab_title', {
                type: Sequelize.STRING
            }
        );
    },
    down: function(queryInterface) {
        return queryInterface.removeColumn(
            'seo_course_list',
            'page_prefix_tab_title'
        );
    }
};
