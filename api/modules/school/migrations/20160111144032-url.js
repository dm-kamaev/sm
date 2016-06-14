'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('school', 'url', {
            type: Sequelize.STRING
        })
            .then(function() {
                return queryInterface.createTable('school_url', {
                    id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: Sequelize.INTEGER
                    },
                    'created_at': {
                        allowNull: false,
                        type: Sequelize.DATE
                    },
                    'updated_at': {
                        allowNull: false,
                        type: Sequelize.DATE
                    },
                    'school_id': {
                        onDelete: 'cascade',
                        type: Sequelize.INTEGER,
                        references: {
                            model: 'school',
                            key: 'id'
                        }
                    },
                    url: {
                        type: Sequelize.STRING
                    }
                });
            });
    },
    down: function(queryInterface) {
        return queryInterface.removeColumn('school', 'url')
            .then(function() {
                return queryInterface.dropTable('school_url');
            });
    }
};
