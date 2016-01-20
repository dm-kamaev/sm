'use strict';
const path = require('path');
const ModelArchiver = require('../../console/modules/modelArchiver/ModelArchiver.js') ;
const Area = require('../../api/modules/geo/models/area');
const Address = require('../../api/modules/geo/models/address');
const Department = require('../../api/modules/geo/models/department');
const AddressMetro = require('../../api/modules/geo/models/addressMetro')
const dataFolder = path.join(__dirname, '../../api/modules/geo/migrations');
const archive1 = '20160119125633-new-geo_1.tar.gz';
const archive2 = '20160119125633-new-geo_2.tar.gz';
const archive3 = '20160119125633-new-geo_3.tar.gz';
const archive4 = '20160119125633-new-geo_4.tar.gz';
const await = require('asyncawait/await');
const async = require('asyncawait/async');
module.exports = {
    up: async(function () {
        var archiver = new ModelArchiver(Area, dataFolder, null, archive1);
        await(archiver.load());
        var archiver2 = new ModelArchiver(Address, dataFolder, null, archive2);
        await(archiver2.load());
        var archiver3 = new ModelArchiver(Department, dataFolder, null, archive3);
        await(archiver3.load());
        var archiver4 = new ModelArchiver(AddressMetro, dataFolder, null, archive4);
        await(archiver4.load());
    }),
    down: function () {
        return null;
    }
};
