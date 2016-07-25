'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const sequelize = require.main.require('../../../app/components/db');

module.exports = {
    up: async(function() {
        var query =
            'ALTER TABLE "school" ALTER COLUMN "specialized_classes" TYPE ' +
            'INTEGER[][] USING (specialized_classes::INTEGER[][]);';
        await(sequelize.query(query));
    }),
    down: async(function() {
        var query =
            'ALTER TABLE "school" ALTER COLUMN "specialized_classes" TYPE ' +
            'VARCHAR[][] USING (specialized_classes::VARCHAR[][]);';
        await(sequelize.query(query));
    })
};
