'use strict';

const path = require('path');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const squel = require('squel');

const sequelize = require('../../app/components/db');
const Archiver = require('../../console/modules/modelArchiver/Archiver');

const DELIMITER = ',';

module.exports = {
    up: async(function() {
        var dir = path.join(__dirname, '../../api/modules/geo/migrations'),
            file = '20160802215300-address-entity-id-data.tar.gz',
            archiver = new Archiver(path.join(dir, file));

        sequelize.options.logging = false;

        archiver.updateTable('address', DELIMITER, ['id']);

        var queryString = squel.delete()
            .from('address')
            .where('entity_id IS NULL')
            .toString();

        await(sequelize.query(
            queryString, {
                type: sequelize.QueryTypes.DELETE
            }
        ));
    }),
    down: function() {
        return null;
    }
};
