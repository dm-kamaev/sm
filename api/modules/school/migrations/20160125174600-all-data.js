'use strict';

const path = require('path');
const async = require('asyncawait/async');

const ModelArchiver =
    require('../../console/modules/modelArchiver/ModelArchiver.js');

const folder = path.join(__dirname, '../../api/modules/school/migrations');
const pathToData = path.join(folder, '20160125174600-all-data.json');
const data = require(pathToData).data;


module.exports = {
    up: async(function(queryInterface, Sequelize) {
        data.forEach(item => {
            var file = item.fileName;
            var model =
                require(item.pathToModel); // eslint-disable-line global-require
            var archiver = new ModelArchiver(model, folder, null, file);

            console.log('-', model);

            archiver.load({
                bulkInsert: true
            });
        });
    }),
    down: async(function(queryInterface) {
        return null;
    })
};
