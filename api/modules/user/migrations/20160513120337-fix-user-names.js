'use strict';

const await = require('asyncawait/await');
const async = require('asyncawait/async');

const path  = require('path');
const ModelArchiver = require(
    '../../console/modules/modelArchiver/ModelArchiver.js');
const School = require('../../api/modules/user/models/userData');


module.exports = {
    up: async(function() {
        var dir = path.join(__dirname, '../../api/modules/user/migrations'),
            file = '20160513120337-fix-user-names.tar.gz',
            archiver = new ModelArchiver(School, dir, null, file);

        await(archiver.load());
    }),
    down: async(function(queryInterface) {

    })
};
