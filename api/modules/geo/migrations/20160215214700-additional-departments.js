'use strict';

const path = require('path');
const async = require('asyncawait/async');

const ModelArchiver =
    require('../../console/modules/modelArchiver/ModelArchiver.js');
const Department = require('../../api/modules/geo/models/department');

module.exports = {
    up: async(function() {
        var dir = path.join(__dirname, '../../api/modules/geo/migrations'),
            file = '20160215214700-additional-departments.tar.gz',
            archiver = new ModelArchiver(Department, dir, null, file);

        archiver.load({
            bulkInsert: true
        });
    }),
    down: function() {
        return null;
    }
};
