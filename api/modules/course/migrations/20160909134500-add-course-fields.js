'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

module.exports = {
    up: async(function(queryInterface, Sequelize) {
        await(queryInterface.addColumn('course', 'type', {
            type: Sequelize.INTEGER,
            references: {
                model: 'course_type',
                key: 'id'
            },
            onUpdate: 'cascade'
        }));
        await(queryInterface.renameColumn(
            'course',
            'full_info',
            'full_description'
        ));
        await(queryInterface.addColumn('course', 'about', {
            type: Sequelize.STRING
        }));
        await(queryInterface.addColumn('course', 'entrance_exam', {
            type: Sequelize.TEXT
        }));
        await(queryInterface.addColumn('course', 'learning_outcome', {
            type: Sequelize.TEXT
        }));
        return queryInterface.addColumn('course', 'lead_type', {
            type: Sequelize.TEXT
        });
    }),
    down: async(function(queryInterface) {
        await(queryInterface.removeColumn('course', 'type'));
        await(queryInterface.renameColumn(
            'course',
            'full_description',
            'full_info'
        ));
        await(queryInterface.removeColumn('course', 'about'));
        await(queryInterface.removeColumn('course', 'entrance_exam'));
        await(queryInterface.removeColumn('course', 'learning_outcome'));
        return queryInterface.removeColumn('course', 'lead_type');
    })
};
