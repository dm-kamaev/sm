'use strict';

const await = require('asyncawait/await');
const async = require('asyncawait/async');

const path = require('path');
const ModelArchiver =
    require('../../console/modules/modelArchiver/ModelArchiver.js');
const SchoolTypeFilter =
    require('../../api/modules/school/models/schoolTypeFilter');


module.exports = {
    up: async(function() {
        var dir = path.join(__dirname, '../../api/modules/school/migrations'),
            file = '20160325141749-add-school-type-aliases-data.tar.gz',
            archiver = new ModelArchiver(SchoolTypeFilter, dir, null, file);

        await(archiver.load());
    }),
    down: async(function(queryInterface) {
        await(queryInterface.removeColumn('school_type_filter', 'alias'));
    })
};
