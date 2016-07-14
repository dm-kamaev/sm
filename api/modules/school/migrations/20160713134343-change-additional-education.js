'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

module.exports = {
    up: async(function(queryInterface, Sequelize) {
        await(queryInterface.addColumn(
            'additional_education',
            'sphere_id',
            {
                type: Sequelize.INTEGER,
                onDelete: 'cascade',
                references: {
                    model: 'additional_education_sphere',
                    key: 'id'
                }
            }
        ));
        return queryInterface.removeColumn(
            'additional_education',
            'sphere'
        );
    }),
    down: async(function(queryInterface, Sequielize) {
        await(queryInterface.removeColumn('additional_education', 'sphere_id'));
        return queryInterface.addColumn(
            'additional_education',
            'sphere',
            {
                type: Sequielize.STRING
            }
        );
    })
};
