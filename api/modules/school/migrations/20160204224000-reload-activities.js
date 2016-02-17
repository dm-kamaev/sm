'use strict';

const path = require('path');
const await = require('asyncawait/await');
const async = require('asyncawait/async');

const ModelArchiver = require('../../console/modules/modelArchiver/ModelArchiver.js');
const Activity = require('../../api/modules/school/models/activity');

module.exports = {
    up: async(function () {
        await(Activity.destroy({
            truncate: true
        }));

        var dir = path.join(__dirname, '../../api/modules/school/migrations'),
            file = '20160204224000-reload-activities.tar.gz',
            archiver = new ModelArchiver(Activity, dir, null, file);

        archiver.load({
            bulkInsert: true
        });
    }),
    down: function () {
        return null;
    }
};
