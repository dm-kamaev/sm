'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('school', 'total_score', {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0
        })
            .then(function() {
                return queryInterface.addColumn('school', 'score_count', {
                    type: Sequelize.ARRAY(Sequelize.INTEGER)
                });
            })
            .then(function() {
                return queryInterface.addColumn('school', 'review_count', {
                    type: Sequelize.INTEGER
                });
            })
            .then(function() {
                return queryInterface.renameColumn(
                    'school',
                    'rank',
                    'rank_dogm'
                );
            })
            .then(function() {
                return queryInterface.addColumn('school', 'rank', {
                    type: Sequelize.INTEGER
                });
            });
    },
    down: function(queryInterface) {
        return queryInterface.removeColumn('school', 'total_score')
            .then(function() {
                return queryInterface.removeColumn('school', 'score_count');
            })
            .then(function() {
                return queryInterface.removeColumn('school', 'review_count');
            })
            .then(function() {
                return queryInterface.removeColumn('school', 'rank');
            })
            .then(function() {
                return queryInterface.renameColumn(
                    'school',
                    'rank_dogm',
                    'rank'
                );
            });
    }
};
