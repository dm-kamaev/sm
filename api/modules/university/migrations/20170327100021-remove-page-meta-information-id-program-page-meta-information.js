module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.removeColumn('program_page_meta_information', 'page_meta_information_id');
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('program_page_meta_information', 'page_meta_information_id', {
            onDelete: 'cascade',
            type: Sequelize.INTEGER,
            field: 'page_meta_information_id',
            references: {
                model: 'page_meta_information',
                key: 'id'
            }
        });
    }
};
