'use strict';

const path = require('path');
const async = require('asyncawait/async');
const ModelArchiver =
    require('../../console/modules/modelArchiver/ModelArchiver.js');
const model =
    require(path.join(__dirname, '../../api/modules/geo/models/address'));

const folder = path.join(__dirname, '../../api/modules/geo/migrations');
const file = '20160219211200-address-is-school.tar.gz';

module.exports = {
    up: async(function(queryInterface, Sequelize) {
        return queryInterface.addColumn('address', 'is_school',
            {
                type: Sequelize.BOOLEAN
            }
        )
        .then(async(function() {
            var archiver = new ModelArchiver(model, folder, null, file);

            console.log('-', model);

            archiver.load();
        }));
    }),
    down: async(function(queryInterface) {
        return queryInterface.dropColumn('address', 'is_school');
    })
};
