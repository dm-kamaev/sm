'use strict';

var userType = require('../../api/modules/user/enums/userType');

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.removeColumn('comment', 'user_type')
            .then(function () {
                return queryInterface.createTable('user_data', {
                    id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: Sequelize.INTEGER
                    },
                    user_type: {
                        allowNull: false,
                        type: Sequelize.ENUM,
                        values: userType.toArray()
                    },
                    class_type: {
                        type: Sequelize.INTEGER
                    },
                    year_graduate: {
                        type: Sequelize.INTEGER
                    },
                    created_at: Sequelize.DATE,
                    updated_at: Sequelize.DATE
                }).then(function () {
                    return queryInterface.addColumn('comment', 'user_data_id', {
                        type: Sequelize.INTEGER,
                        references: {
                            model: 'user_data',
                            key: 'id'
                        }
                    });
                }).then(function () {
                    return queryInterface.addColumn('rating', 'user_data_id', {
                        type: Sequelize.INTEGER,
                        references: {
                            model: 'user_data',
                            key: 'id'
                        }
                    });
                });
            });
    },
    down: function (queryInterface) {
        return queryInterface.removeColumn('comment', 'user_data_id')
            .then(function() {
                return queryInterface.removeColumn('rating', 'user_data_id')
            }).then(function () {
                return queryInterface.dropTable('user_data');
            });
    }
};


