'use strict';
const path = require('path');
const ModelArchiver = require('../../console/modules/modelArchiver/ModelArchiver.js') ;
const School = require('../../api/modules/school/models/school');
const dataFolder = path.join(__dirname, '../../api/modules/school/migrations');
const archiveName = ModelArchiver.migrationToArchive(__filename);
const async = require('asyncawait/async');
const await = require('asyncawait/await');

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('school', 'total_score', {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0
        }).then(function() {
            return queryInterface.addColumn('school', 'score_count', {
                type: Sequelize.ARRAY(Sequelize.INTEGER)
            }).then(function() {
                return queryInterface.addColumn('school', 'review_count', {
                    type: Sequelize.INTEGER
                }).then(function() {
                    return queryInterface.renameColumn(
                        'school', 
                        'rank', 
                        'rank_dogm').then(function() {
                            return queryInterface.addColumn('school', 'rank', {
                                type: Sequelize.INTEGER
                            }).then(async(function(){
                                var archiver = new ModelArchiver(School, dataFolder, null, archiveName);
                                await(archiver.load());
                            }));
                        });
                });
            });
        });
    },
    down: function (queryInterface) {
        return queryInterface.removeColumn('school', 'total_score')
            .then(function() {
                return queryInterface.removeColumn('school', 'score_count')
                    .then(function() {
                        return queryInterface.removeColumn('school', 'review_count')
                            .then(function() {
                                return queryInterface.removeColumn('school', 'rank')
                                    .then(function() {
                                        return queryInterface.renameColumn(
                                            'school', 
                                            'rank_dogm', 
                                            'rank');
                                    });
                            });
                    });
            });
    }
};
