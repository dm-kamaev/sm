'use strict';

const await = require('asyncawait/await');
const async = require('asyncawait/async');

const path = require('path');
const ModelArchiver = require(
    '../../console/modules/modelArchiver/ModelArchiver.js');
const School = require('../../api/modules/school/models/school');


module.exports = {
    up: async(function() {
        var dir = path.join(__dirname, '../../api/modules/school/migrations'),
            file = '20160530215900-seo-description-data.tar.gz',
            archiver = new ModelArchiver(School, dir, null, file);

        await(archiver.load());
    }),
    down: async(function(queryInterface) {

    })
};
