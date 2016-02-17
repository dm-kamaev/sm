'use strict';

const path = require('path');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const ModelArchiver = require('../../console/modules/modelArchiver/ModelArchiver.js');
const model = require(path.join(__dirname, '../../api/modules/geo/models/addressMetro'));

const folder = path.join(__dirname, '../../api/modules/geo/migrations');
const file = '20160215162532-address-metro-distance-data.tar.gz';

module.exports = {
    up: async(function (queryInterface, Sequelize) {
        return queryInterface.addColumn('address_metro', 'distance',
            {
                type: Sequelize.INTEGER
            })
            .then(async(function() {
                var archiver = new ModelArchiver(model, folder, null, file);

                console.log('-', model);

                archiver.load();
            }));
    }),
    down: async(function (queryInterface) {
        return queryInterface.dropColumn('address_metro', 'distance')
    })
};
