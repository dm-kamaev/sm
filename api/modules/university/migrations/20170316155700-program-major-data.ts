import {join as pathJoin} from 'path';

const Archiver = require('../../console/modules/modelArchiver/Archiver');

const TABLE_NAME = 'program_major';
const DELIMITER = ',';
const FILE_PATH = 'api/modules/university/migrations';
const FILE_NAME = '20170316155700-program-major-data.tar.gz';

module.exports = {
    up: async function(queryInterface, Sequelize) {
        const dir = pathJoin(
            __dirname,
            '../../',
            FILE_PATH
        );
        const filePath = pathJoin(dir, FILE_NAME);
        const archiver = new Archiver(filePath);

        await archiver.fillTable(TABLE_NAME, DELIMITER);
    },
    down: function(queryInterface, Sequelize) {
        return; // it's data migration, you can't rollback it
    }
};
