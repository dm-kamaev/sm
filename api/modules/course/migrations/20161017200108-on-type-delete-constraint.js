'use strict';

const async = require('asyncawait/async');
const await = require('asyncawait/await');

const sequelize = require('../../app/components/db');

module.exports = {
    up: async(function(queryInterface, Sequelize) {
        await(dropConstraint());
        return await(createUpdateDeleteConstraint());
    }),
    down: async(function(queryInterface, Sequelize) {
        await(dropConstraint());
        return await(createUpdateConstraint());
    })
};


/**
 * Drop existing constraint course type
 * @return {Promise}
 */
let dropConstraint = function() {
    let query = 'ALTER TABLE course DROP CONSTRAINT course_type_fkey';
    return await(sequelize.query(query));
};

/**
 * Create on delete on update constraint for course type
 * @return {Promise}
 */
let createUpdateDeleteConstraint = function() {
    let query = 'ALTER TABLE course ADD FOREIGN KEY (type) ' +
        'REFERENCES course_type(id) ' +
        'ON DELETE SET NULL ON UPDATE CASCADE';
    return await(sequelize.query(query));
};

/**
 * Create on update constraint for course type
 * @return {Promise}
 */
let createUpdateConstraint = function() {
    let query = 'ALTER TABLE course ADD FOREIGN KEY (type) ' +
        'REFERENCES course_type(id) ' +
        'ON UPDATE CASCADE';
    return await(sequelize.query(query));
};
