module.exports = {
    up: function(queryInterface, Sequelize) {
        return [
            queryInterface.addColumn(
                'program_page_meta_information',
                'tab_title', { type: Sequelize.STRING }
            ),
            queryInterface.addColumn(
                'program_page_meta_information',
                'seo_description', { type: Sequelize.TEXT }
            ),
            queryInterface.addColumn(
                'program_page_meta_information',
                'open_graph_description', { type: Sequelize.TEXT }
            ),
        ];
    },
    down: function(queryInterface, Sequelize) {
        return [
            queryInterface.removeColumn(
                'program_page_meta_information',
                'tab_title'
            ),
            queryInterface.removeColumn(
                'program_page_meta_information',
                'seo_description'
            ),
            queryInterface.removeColumn(
                'program_page_meta_information',
                'open_graph_description'
            ),
        ];
    }
};
