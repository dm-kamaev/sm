'use strict';
const path = require('path');
const ModelArchiver = require('../../console/modules/modelArchiver/ModelArchiver.js') ;
const School = require('../../api/modules/school/models/school');
const SchoolUrl = require('../../api/modules/school/models/schoolUrl');
const dataFolder = path.join(__dirname, '../../api/modules/school/migrations');
const archive1 = '20160111144032-url_1.tar.gz';
const archive2 = '20160111144032-url_2.tar.gz';
const await = require('asyncawait/await');
const async = require('asyncawait/async');
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('school','url', {
            type: Sequelize.STRING,
            unique: true
        }).then(async(function() {
            var archiver = new ModelArchiver(School, dataFolder, null, archive1);
            await(archiver.load());
        })).then(function() {
            return queryInterface.createTable('school_url', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                created_at: {
                    allowNull: false,
                    type: Sequelize.DATE
                },
                updated_at: {
                    allowNull: false,
                    type: Sequelize.DATE
                },
                school_id: {
                    onDelete: 'cascade',
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'school',
                        key: 'id',
                    }
                },
                url: {
                    type: Sequelize.STRING
                }
            }).then(async(function() {
                var archiver = new ModelArchiver(SchoolUrl, dataFolder, null, archive2);
                await(archiver.load());
            }));
        });
    },
    down: function (queryInterface) {
        return queryInterface.removeColumn('school', 'url')
            .then(function(){
                return queryInterface.dropTable('school_url');
            });
    }
};
