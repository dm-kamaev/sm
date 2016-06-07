'use strict';

const schoolType = require('../../api/modules/school/enums/schoolType');

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('school', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            abbreviation: {
                type: Sequelize.STRING
            },
            full_name: {
                type: Sequelize.STRING
            },
            director: {
                type: Sequelize.STRING
            },
            phones: {
                type: Sequelize.ARRAY(Sequelize.STRING)
            },
            site: {
                type: Sequelize.STRING
            },
            school_type: {
                type: Sequelize.ENUM,
                values: schoolType.toArray()
            },
            goverment_key: {
                type: Sequelize.INTEGER,
                unique: true
            },
            rank: {
                type: Sequelize.INTEGER
            },
            seo_description: {
                type: Sequelize.STRING(300)
            },
            score: {
                type: Sequelize.ARRAY(Sequelize.FLOAT)
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
                    key: 'id'
                }
            },

            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE
        });
    },
    down: function (queryInterface) {
        return queryInterface.dropTable('school');
    }
};
