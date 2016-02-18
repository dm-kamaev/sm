'use strict';

const path = require('path');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const ModelArchiver = require('../../console/modules/modelArchiver/ModelArchiver.js');
const model = require(path.join(__dirname, '../../api/modules/geo/models/address'));

const folder = path.join(__dirname, '../../api/modules/geo/migrations');
const file = '20160218145347-address-empty-area-fix.tar.gz';

module.exports = {
    up: async(function (queryInterface, Sequelize) {
        var archiver = new ModelArchiver(model, folder, null, file);

        console.log('-', model);

        archiver.load();
    }),
    down: async(function (queryInterface) {
        return null;
    })
};
