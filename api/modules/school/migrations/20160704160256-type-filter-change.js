'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');
const squel = require('squel').useFlavour('postgres');

const sequelize = require('../../app/components/db');

module.exports = {
    up: async(function() {
        var date = new Date().toJSON(),
            sqlUpdate = squel.update()
            .table('school_type_filter')
            .set('name', 'Лицеи')
            .set('values', '{LYCEUM}')
            .set('alias', 'lyceum')
            .set('updated_at', date)
            .where('values @> \'{LYCEUM}\'')
            .toString();
        await(sequelize.query(
            sqlUpdate,
            {
                type: sequelize.QueryTypes.UPDATE
            }
        ));

        var sqlInsert = squel.insert()
            .into('school_type_filter')
            .set('name', 'Гимназии')
            .set('values', '{GYMNASIUM}')
            .set('alias', 'gymnasium')
            .set('updated_at', date)
            .set('created_at', date)
            .toString();
        await(sequelize.query(
            sqlInsert,
            {
                type: sequelize.QueryTypes.INSERT
            }
        ));
    }),
    down: async(function() {
        var date = new Date().toJSON(),
            sqlUpdate = squel.update()
                .table('school_type_filter')
                .set('name', 'Лицеи и гимназии')
                .set('values', '{LYCEUM, GYMNASIUM}')
                .set('alias', 'lyceum-or-gymnasium')
                .set('updated_at', date)
                .where('values @> \'{LYCEUM}\'')
                .toString();

        await(sequelize.query(
            sqlUpdate,
            {
                type: sequelize.QueryTypes.UPDATE
            }
        ));
    })
};
