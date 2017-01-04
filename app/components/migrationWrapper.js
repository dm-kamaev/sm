const path = require('path');

const MigrationExecutor = require('nodules/sequelize/MigrationExecutor.js');

module.exports = new MigrationExecutor({
    projectRoot: path.resolve(__dirname, '../..'),
    modules: 'api/modules',
    migrations: '/migrations',
    migrationExecute: 'tmp/migrations'
});
