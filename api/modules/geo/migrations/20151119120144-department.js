'use strict';

const path = require('path');
const async = require('asyncawait/async');
const ModelArchiver = require('../../console/modules/modelArchiver/ModelArchiver.js') ;
const Department = require('../../api/modules/geo/models/department');
const dataFolder = path.join(__dirname, '../../api/modules/geo/migrations');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('department', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: Sequelize.STRING,
        stage: { // 'Дошкольное образование', 'Начальное образование', 'Основное и среднее', 'Дополнительное  образование', 'Профессиональное образование'
            type: Sequelize.ENUM,
            values: ['Дошкольное образование', 'Начальное образование', 'Основное и среднее', 'Дополнительное образование', 'Профессиональное образование']
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
     }).then(async(function() {
        var archiver = new ModelArchiver(Department, dataFolder);
        archiver.load();
    }));
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('department');
  }
};
