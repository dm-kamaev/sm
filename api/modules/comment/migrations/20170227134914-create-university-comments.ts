module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('university_comment', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            pros: {
                type: Sequelize.TEXT
            },
            cons: {
                type: Sequelize.TEXT
            },
            advice: {
                type: Sequelize.TEXT
            },
            commentGroupId: {
                field: 'comment_group_id',
                type: Sequelize.INTEGER,
                onDelete: 'cascade',
                references: {
                    model: 'comment_group',
                    key: 'id'
                }
            },
            userDataId: {
                field: 'user_data_id',
                type: Sequelize.INTEGER,
                references: {
                    model: 'user_data',
                    key: 'id'
                }
            },
            ratingId: {
                field: 'rating_id',
                type: Sequelize.INTEGER,
                references: {
                    model: 'rating',
                    key: 'id'
                }
            },
            isNoticeSend: {
                field: 'is_notice_send',
                type: Sequelize.BOOLEAN
            },
            createdAt: {
                field: 'created_at',
                type: Sequelize.DATE
            },
            updatedAt: {
                field: 'updated_at',
                type: Sequelize.DATE
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('university_comment');
    }
};
