'use strict';

module.exports = {
    up: function(queryInterface) {
        return queryInterface.removeColumn('school', 'url')
            .then(function() {
                return queryInterface.removeColumn('school', 'views');
            })
            .then(function() {
                return queryInterface.removeColumn('school', 'seo_description');
            });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('school', 'url', {
            type: Sequelize.STRING,
            unique: true
        })
            .then(function() {
                return queryInterface.removeColumn('school', 'views', {
                    type: Sequelize.INTEGER,
                    notNull: false,
                    defaultValue: 0
                });
            })
            .then(function() {
                return queryInterface.removeColumn(
                    'school',
                    'seo_description',
                    {
                        type: Sequelize.STRING(300),
                        field: 'seo_description'
                    });
            });
    }
};
