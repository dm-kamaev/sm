'use strict';
var authorType = require('../../api/modules/comment/enums/authorType');
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('comment', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            'created_at': {
                type: Sequelize.DATE
            },
            'updated_at': {
                type: Sequelize.DATE
            },
            text: {
                type: Sequelize.TEXT
            },
            'user_type': {
                allowNull: false,
                type: Sequelize.ENUM, // ('Parent','Graduate','Scholar'),
                values: authorType.toArray()
            },
            score: {
                allowNull: false,
                type: Sequelize.ARRAY(Sequelize.INTEGER)
            },
            'comment_group_id': {
                type: Sequelize.INTEGER,
                onDelete: 'cascade',
                references: {
                    model: 'comment_group',
                    key: 'id',
                }
            }
        });
    },
    down: function(queryInterface) {
        return queryInterface.dropTable('comment');
    }
};
