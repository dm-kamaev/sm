'use strict';

const await = require('asyncawait/await');
const async = require('asyncawait/async');
const squel = require('squel');
const sequelize = require('../../app/components/db');

module.exports  = {
    up: async(function(queryInterface, Sequelize) {

        try {
            await(queryInterface.addColumn('rating', 'total_score', {
                type: Sequelize.FLOAT
            }));
        }
        catch (error) {
        };
    }),
    down: async(function (queryInterface, Sequelize) {
        return await(queryInterface.removeColumn('rating', 'total_score'));
    })
};
