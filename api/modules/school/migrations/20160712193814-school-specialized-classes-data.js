'use strict';

'use strict';

const async = require('asyncawait/async'),
    path = require('path');

const Archiver = require('../../console/modules/modelArchiver/Archiver.js');

const TABLE = 'school',
    DELIMITER = '|';

module.exports = {
    up: async(function() {
        var dir = path.join(
                __dirname,
                '../../api/modules/school/migrations'
            ),
            file = '20160712193814-school-specialized-classes-data.tar.gz',
            filePath = path.join(dir, file),
            archiver = new Archiver(filePath);

        archiver.updateTable(TABLE, DELIMITER, ['id']);
    }),
    down: async(function() {
        return null;
    })
};
