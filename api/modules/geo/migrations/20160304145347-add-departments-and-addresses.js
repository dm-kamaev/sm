'use strict';

const path = require('path');
const async = require('asyncawait/async');

const ModelArchiver = require(
    '../../console/modules/modelArchiver/ModelArchiver.js');
const Address = require('../../api/modules/geo/models/address');
const Department = require('../../api/modules/geo/models/department');
const AddressMetro = require('../../api/modules/geo/models/addressMetro');

module.exports = {
    up: async(function() {
        var dir = path.join(__dirname, '../../api/modules/geo/migrations'),
            file = '20160304145347-add-addresses.tar.gz',
            addressArchiver = new ModelArchiver(Address, dir, null, file);
        console.log('-Address');
        addressArchiver.load();

        file = '20160304145347-add-departments.tar.gz';
        var departmentArchiver = new ModelArchiver(Department, dir, null, file);
        console.log('-Department');
        departmentArchiver.load();

        file = '20160304145347-add-address-metro.tar.gz';
        var addressMetroArchiver =
            new ModelArchiver(AddressMetro, dir, null, file);
        console.log('-Address-metro');
        addressMetroArchiver.load();
    }),
    down: function() {
        return null;
    }
};
