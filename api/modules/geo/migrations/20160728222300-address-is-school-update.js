'use strict';

const path = require('path');
const async = require('asyncawait/async');

const sequelize = require('../../app/components/db');
const Archiver = require('../../console/modules/modelArchiver/Archiver');

const DELIMITER = ',';

module.exports = {
    up: async(function() {
        var dir = path.join(__dirname, '../../api/modules/geo/migrations'),
            file = '20160728222300-address-is-school-update.tar.gz',
            archiver = new Archiver(path.join(dir, file));

        sequelize.options.logging = false;

        archiver.updateTable('address', DELIMITER, ['id']);
    }),
    down: function() {
        return null;
    }
};
