const path = require('path');
const ModelArchiver = require('../../console/modules/modelArchiver/ModelArchiver.js') ;
const CityResult = require('../../api/modules/study/models/cityResult');
const dataFolder = path.join(__dirname, '../../api/modules/study/migrations');
const async = require('asyncawait/async');

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('city_result', {
            id: { 
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            city_id: {
                type: Sequelize.INTEGER,
                references: {
                    model:'city',
                    key: 'id',
                }
            },
            subject_id: {
                type: Sequelize.INTEGER,
                references: {
                    model:'subject',
                    key: 'id',
                }
            },
            gia_result: {
                type: Sequelize.FLOAT,
            },        
            ege_result: {
                type: Sequelize.FLOAT,
            },        
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE
        }).then(async(function() {
            var archiver = new ModelArchiver(CityResult, dataFolder);
            archiver.load();
        }));
    },
    down: function (queryInterface) {
        return queryInterface.dropTable('city_result');
    }
};
