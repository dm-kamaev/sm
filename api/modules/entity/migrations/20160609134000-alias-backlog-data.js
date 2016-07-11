'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    squel = require('squel');
squel.useFlavour('postgres');

const sequelize = require('../../app/components/db');

module.exports = {
    up: async(function() {
        var schoolUrlSelect = squel.select()
            .from('school_url')
            .field('school_id', 'entity_id')
            .field('\'school\'')
            .field('url', 'alias')
            .field('now()', 'created_at')
            .field('now()', 'updated_at');

        var dataInsert = squel.insert()
            .into('alias_backlog')
            .fromQuery([
                'entity_id',
                'entity_type',
                'alias',
                'created_at',
                'updated_at'
            ], schoolUrlSelect)
            .toString();

        await(sequelize.query(dataInsert));
    }),
    down: function() {

    }
};
