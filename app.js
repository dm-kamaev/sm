'use strict';

const cluster = require('cluster'),
    osCpus = require('os').cpus(),
    async = require('asyncawait/async'),
    await = require('asyncawait/await');

const logger = require('./app/components/logger/logger').getLogger('app');
const StartupControl =
    require('./app/components/startupControl/startupControl');

cluster.setupMaster({
    exec: 'app_worker.js'
});

cluster.on('listening', (worker, address) => {
    logger.info(
        'app process with id %s is running on port %s',
        worker.id,
        address.port
    );
});

async(function() {
    var startupControl = new StartupControl({
        'checkMigrations': true
    });
    await(startupControl.check());
})();

for (var i = 0, osCpusLength = osCpus.length; i < osCpusLength; i++) {
    cluster.fork();
}
