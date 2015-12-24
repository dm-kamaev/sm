'use strict';
const schoolType = require('../../api/modules/school/enums/schoolType');
const path = require('path');
const ModelArchiver = require('../../console/modules/modelArchiver/ModelArchiver.js') ;
const School = require('../../api/modules/school/models/school');
const dataFolder = path.join(__dirname, '../../api/modules/school/migrations');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('school', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        created_at: {
            type: Sequelize.DATE
        },
        updated_at: {
            type: Sequelize.DATE
        },
        name: {
            type: Sequelize.STRING,
        },
        abbreviation: {
            type: Sequelize.STRING,
        },
        full_name: {
            type: Sequelize.STRING,
        },
        director: {
            type: Sequelize.STRING,
        },
        phones: {
            type: Sequelize.ARRAY(Sequelize.STRING),
        },
        site: {
            type: Sequelize.STRING,
        },
        school_type: {
            type: Sequelize.ENUM,
            values: schoolType.toArray(), 
        },
        goverment_key: {
            type: Sequelize.INTEGER,
            unique: true
        },
        rank: {
            type: Sequelize.INTEGER,
        },
        score: {
            type: Sequelize.ARRAY(Sequelize.FLOAT),
        },
        education_interval: {
            type: Sequelize.ARRAY(Sequelize.INTEGER)
        },
        city_id: {
            type: Sequelize.INTEGER,
            references: {
                 model: 'city',
                 key: 'id'
            }
        },
        comment_group_id: {
            type: Sequelize.INTEGER,
            references: {
                model:'comment_group',
                key: 'id',
            }
        }
    }).then(async(function() {
        var archiver = new ModelArchiver(School, dataFolder);
        await(archiver.load());
    }));
  },
  down: function (queryInterface) {
    return queryInterface.dropTable('school');
  }
};
