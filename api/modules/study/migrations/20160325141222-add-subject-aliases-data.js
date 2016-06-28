'use strict';

const await = require('asyncawait/await');
const async = require('asyncawait/async');

const path = require('path');
const ModelArchiver = require(
    '../../console/modules/modelArchiver/ModelArchiver.js');
const Subject = require('../../api/modules/study/models/subject');


module.exports = {
    up: async(function() {
        var dir = path.join(__dirname, '../../api/modules/study/migrations'),
            file = '20160325141222-add-subject-aliases-data.tar.gz',
            archiver = new ModelArchiver(Subject, dir, null, file);

        await(archiver.load());
    }),
    down: async(function(queryInterface) {
        await(queryInterface.removeColumn('subject', 'alias'));
    })
};
