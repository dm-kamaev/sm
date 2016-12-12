'use strict';

// author: dm-kamaev
// get coords for every area via yandex api
// save to .tar.gz for migaration

const commander = require('commander');

const Area = require('../api/modules/geo/models/area.js');
const axios = require('axios');
const path = require('path');
const util = require('util');
const logger = require('../app/components/logger/logger.js').getLogger('app');

const async = require('asyncawait/async');
const await = require('asyncawait/await');
const Converter = require("csvtojson").Converter,
    lodashCompact = require('lodash/array/compact');

const services = require('../app/components/services').all,
    CsvConverter = require('./modules/modelArchiver/CsvConverter'),
    Archiver = require('./modules/modelArchiver/Archiver');


class GetCoordsForArea {
    /**
     * [constructor description]
     * @return {[type]} [description]
     */
    constructor() {
        this.prefixAdress = 'город Москва,';
        this.urlGeocoder = 'http://geocode-maps.yandex.ru/1.x/';
        this.areasCoords = [];
    }

    /**
     * [start description]
     * @return {[type]} [description]
     */
    start() {
        logger.info('START: get coordinates for every area and save to CSV');
        this.areas = readAllAreas_();
        this.getCoords();
        let csv = createCsv_(this.areasCoords);
        logger.info('CSV:');
        logger.info(csv);
        let pathMigrations = path.join(__dirname, '../api/modules/geo/migrations/');
        pathMigrations += '20161209170000-area-update-coords.tar.gz';
        logger.info('pathMigrations= '+pathMigrations);
        new Archiver(pathMigrations).compress(csv);
        logger.info('END: get coordinates for every area and save to CSV');
    }


    /**
     * [getCoords description]
     * @return {[type]} [description]
     */
    getCoords() {
        let areasCoords = this.areasCoords;
        this.areas.forEach((area, i) => {
            let geocode = this.prefixAdress + area.name;
            let res = await(axios.get(this.urlGeocoder, {
                params: {
                    geocode,
                    format: 'json'
                }
            })).data;
            let point = res.response
                           .GeoObjectCollection
                           .featureMember[0]
                           .GeoObject.Point;
            point = point.pos.split(' ').reverse();
            areasCoords.push({
                id: area.id,
                name: area.name,
                center_coords: arrayToStr_(point)
            });
        });
    }

}


/**
 * readAllAreas_
 * @return {Object[]}
 * { id, name, created_at, updated_at, district_id, center_coords }
 */
function readAllAreas_() {
    return await(Area.findAll());
}


/**
 * createCsv_ data to csv
 * @param  {Object[]} areasCoords
 * [ {
 *     id: 47,
       name: 'Красносельский',
       center_coords: '{55.781286,37.663306}'
     },{
       id: 40,
       name: 'Мещанский',
       center_coords: '{55.780066,37.628801}'
    },
   ]
 * @return {String}
 * "id"|"name"|"center_coords"\n47|"Красносельский"|"{55.781286,37.663306}"\n40|"Мещанский"|"{55.780066,37.628801}"
 */
function createCsv_(areasCoords) {
    return CsvConverter.createCsv(areasCoords);
}


/**
 * arrayToStr_ postgres ARRAY to string format
 * @param  {Object[]} array ['55.781286', '37.663306']
 * @return {String}        '{55.781286,37.663306}'
 */
function arrayToStr_(array) {
    return '{'+array.join(',')+'}';
}

// async(() => {
//     new GetCoordsForArea().start();
// })();
commander
    .command('getCoordsForArea')
    .description('get coordinates for every area and save to CSV')
    .action(async(() => {
        new GetCoordsForArea().start();
    }));

exports.Command;