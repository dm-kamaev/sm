/**
 * Created by alexander on 7/14/16.
 */
'use strict';

'use strict';

const async = require('asyncawait/async'),
    path = require('path');

const Archiver = require('../../console/modules/modelArchiver/Archiver.js');

const TABLE = 'additional_education',
    DELIMITER = '|';

module.exports = {
    up: async(function() {
        var dir = path.join(
                __dirname,
                '../../api/modules/school/migrations'
            ),
            file = '20160714103731-add-spheres-to-additional-education.tar.gz',
            filePath = path.join(dir, file),
            archiver = new Archiver(filePath);

        archiver.updateTable(TABLE, DELIMITER, ['id']);
    }),
    down: async(function() {
        return null;
    })
};
