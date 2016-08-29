'use strict';

var async = require('asyncawait/async');
var await = require('asyncawait/await');

var squel = require('squel');

const TABLE_NAME = 'department';
const SEQUENCE_NAME = 'department_id_seq';

var up = async(function(db) {
    var nextId = await(getNextId(db));
    var sqlQuery = 'ALTER SEQUENCE "@SEQUENCE_NAME"' +
        'RESTART WITH @NEXT_ID';
    sqlQuery = sqlQuery
        .replace(/@SEQUENCE_NAME/g, SEQUENCE_NAME)
        .replace(/@NEXT_ID/g, nextId);
    await(db.query(sqlQuery));
});

var getNextId = async(function(db) {
    var sqlQuery = squel.select()
        .field('max(id)')
        .from('"@TABLE_NAME"'.replace(/@TABLE_NAME/g, TABLE_NAME))
        .toString();
    var data = await(db.query(sqlQuery))[0];
    if (!data && !data.length) {
        throw new Error('Can not find departments');
    }
    data = data[0].max + 1;
    return data;
});

module.exports = {
    up: function(queryInterface, Sequelize) {
        return up(queryInterface.sequelize);
    },

    down: function(queryInterface, Sequelize) { }
};
