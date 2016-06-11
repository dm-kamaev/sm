'use strict';

const await = require('asyncawait/await');
const async = require('asyncawait/async');
const sequelize = require('../../app/components/db');

const path = require('path');
const UserDataUpdater = require(
    '../../console/modules/userDataUpdater/userDataUpdater.js');

const folder = path.join(__dirname, '../../api/modules/user/migrations');
const pathToData = path.join(folder, '20160513120337-fix-user-names.tar.gz');

module.exports = {
    up: async(function() {
        var userDataUpdater = new UserDataUpdater();

        sequelize.options.logging = false;

        await(userDataUpdater.updateFromArchive(pathToData));
    }),
    down: async(function(queryInterface) {

    })
};
