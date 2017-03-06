module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('university', 'relap_image_url', {
            type: Sequelize.STRING(511),
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('university', 'relap_image_url');
    }
};
