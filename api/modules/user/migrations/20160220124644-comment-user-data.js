'use strict';

const await = require('asyncawait/await');
const async = require('asyncawait/async');
const sequelize = require('../../app/components/db');
const SqlHelper = require('../../console/modules/sqlHelper/SqlHelper.js');

var userType = require('../../api/modules/user/enums/userType');

module.exports = {
    up: async(function(queryInterface, Sequelize) {
        resetData();

        queryInterface.removeColumn('comment', 'user_type');

        await(queryInterface.createTable('user_data', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            'user_type': {
                allowNull: false,
                type: Sequelize.ENUM,
                values: userType.toArray()
            },
            'class_type': {
                type: Sequelize.INTEGER
            },
            'year_graduate': {
                type: Sequelize.INTEGER
            },
            'created_at': Sequelize.DATE,
            'updated_at': Sequelize.DATE
        }));
        queryInterface.addColumn('comment', 'user_data_id', {
            type: Sequelize.INTEGER,
            references: {
                model: 'user_data',
                key: 'id'
            }
        });
        queryInterface.addColumn('rating', 'user_data_id', {
            type: Sequelize.INTEGER,
            references: {
                model: 'user_data',
                key: 'id'
            }
        });
    }),
    down: function(queryInterface) {
        return queryInterface.removeColumn('comment', 'user_data_id')
            .then(function() {
                return queryInterface.removeColumn('rating', 'user_data_id');
            }).then(function() {
                return queryInterface.dropTable('user_data');
            });
    }
};

var resetData = function() {
    var resetColumns = 'UPDATE school ' +
        'SET score=NULL, ' +
        'comment_group_id=NULL, ' +
        'total_score=0, ' +
        'score_count=NULL, ' +
        'review_count=NULL ' +
        'WHERE comment_group_id <> 0;';
    await(SqlHelper.resetTable('comment'));
    await(SqlHelper.resetTable('rating'));
    await(sequelize.query(
        resetColumns,
        {
            type: sequelize.QueryTypes.UPDATE
        }
    ));
    await(SqlHelper.resetTable('comment_group'));
};
