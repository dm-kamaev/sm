'use strict';

// author: dm-kamev
// update number metro for every address via yandex api

const commander = require('commander');

const Metro = require('../api/modules/geo/models/metro.js');
const Adress = require('../api/modules/geo/models/address.js');
const AdressMetro = require('../api/modules/geo/models/addressMetro.js');
const geoTools = require('./modules/geoTools/geoTools.js');
const logger = require('../app/components/logger/logger.js').getLogger('app');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const util = require('util');

// turn off logging for sequelize
AdressMetro.sequelize.options.logging = false;

commander
    .command('geoCoder')
    .description('update number metro for every address via yandex api')
    .action(async(() => {
        new GeoCoder().start();
    }));
exports.Command;


class GeoCoder {
    /**
     * start update metros and distance
     */
    start() {
        logger.info('START: Update metros for every address');
        let metros = getAllMetros_();
        let addressMetros = getAllAdressMetros_();

        this.searchRadius = 3; // kilometres, search metro for adress
        this.addresses = getAllAdresses_();
        this.addressMetros = buildHashAdressMetros_(addressMetros);
        this.metros = buildHashMetro_(metros);

        this.iterateAdresses();
        logger.info('END: Update metros for every address');
    }

    /**
     * iterateAdresses iterate all adresses
     */
    iterateAdresses() {
        const len = this.addresses.length;
        this.addresses.forEach((address, i) => {
            // [
            // {name: 'метро Чкаловская', coords: [ '37.659263', '55.75593' ]}
            // ]
            let foundMetros = [];
            try {
                foundMetros = await(
                    getMetros_(address.coords, this.searchRadius)
                );
                // logger.info(`AddressId="${address.id}";`, `AddressName="${address.name}"`);
                // logger.info('Found metros= '+JSON.stringify(foundMetros, null, 2));
                this.addedMetroStation(foundMetros);
                this.addedMetrosForAdress(address, foundMetros);
                logger.info(`${++i} from ${len}`);
                logger.info('+++++++++++++++++++');
            } catch (error) {
                logger.critical('Error:');
                logger.critical(error);
                logger.critical(`AddressId="${address.id}";`, `AddressName="${address.name}"`);
                logger.critical('Found metros= '+JSON.stringify(foundMetros, null, 2));
            }
        });
    }

    /**
     * addedMetroStation create and added in hash metro, if not exist
     * @param  {Object[]} foundMetros
     * [ { name: "метро Тургеневская", coords:[37.636742,55.765276] }, ]
     */
    addedMetroStation(foundMetros) {
        foundMetros.forEach(metro => {
            let name = metro.name;
            if (!this.metros[name]) { // new metro station
                let coords = metro.coords;
                metro = await(Metro.create({ name, coords }));
                this.metros[name] = { id: metro.id, coords };
            }
        });
    }


    /**
     * addedMetrosForAdress added adress_id, metro_id and distance, if not exist
     * @param  {Object}   address     [ id, coords:[37.636742,55.765276] ]
     * @param  {Object[]} foundMetros
     * [ { name: "метро Тургеневская", coords:[37.636742,55.765276] }, ]
     */
    addedMetrosForAdress(address, foundMetros) {
        let addressId = address.id,
            addressMetros = this.addressMetros;
        foundMetros.forEach(metro => {
            let metroName = metro.name;
            metro = this.metros[metroName];
            metro.name = metroName;
            let metroId = metro.id, metroCoords = metro.coords;
            if (!addressMetros[addressId]) {
                addressMetros[addressId] = {};
            }
            if (!addressMetros[addressId][metroId]) {
                let distance = geoTools.distanceMetres({
                    latitude: address.coords[1],
                    longitude: address.coords[0],
                }, {
                    longitude: metroCoords[0],
                    latitude: metroCoords[1],
                });

                await(AdressMetro.create({
                    addressId,
                    metroId,
                    distance
                }));
            }
        });
    }
}


/**
 * getAllMetros_
 * @return {Object[]} [ {id, name, coords }, ]
 */
function getAllMetros_() {
    return await(Metro.findAll({
        attributes: ['id', 'name', 'coords']
    }));
}


/**
 * getAllMetros_
 * @return {Object[]} [ {id, name, coords }, ]
 */
function getAllAdresses_() {
    return await(Adress.findAll({
        attributes: ['id', 'name', 'coords'],
        order: 'id ASC',
    }));
}


/**
 * getAllMetros_
 * @return {Object[]} [ { id, address_id, metro_id, distance }, ]
 */
function getAllAdressMetros_() {
    return await(AdressMetro.findAll({
        attributes: ['id', 'address_id', 'metro_id', 'distance']
    }));
}


/**
 * buildHashMetro_
 * @param  {Object[]} metros [ {id, name, coords }, ]
 * @return {Object}
 * { 'метро Третьяковская': { id, coords }, 'метро Полянка': { id, coords } }
 */
function buildHashMetro_(metros) {
    let hash = {};
    metros.forEach(function(metro) {
        hash[metro.name] = {
            id: metro.id,
            coords: metro.coords
        };
    });
    return hash;
}


/**
 * buildHashAdressMetros_
 * @param  {Object[]} addressMetros [ { id, address_id, metro_id, distance }, ]
 * @return {Object} [adressId][metroId]=true
 * {
 *     '4610': { '47': true, '119': true, '121': true, '124': true },
 *     '4611': { '10': true, '55': true },
 * }
 */
function buildHashAdressMetros_(addressMetros) {
    let hash = {};
    addressMetros.forEach(addressMetro => {
        addressMetro = addressMetro.dataValues;
        let adressId = addressMetro.address_id;
        let metroId = addressMetro.metro_id;
        if (!hash[adressId]) {
            hash[adressId] = {};
        }
        hash[adressId][metroId] = true;
    });
    return hash;
}


/**
 * getMetros_ one request per econd
 * @param  {Object[]} coords       [ 37.506, 53,5678 ]
 * @param  {number} searchRadius 3(km)
 * @return {Object} promise
 */
function getMetros_(coords, searchRadius) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            async(() => {
                try {
                    resolve(geoTools.getMetros(coords, searchRadius));
                } catch (error) {
                    reject(error);
                }
            })();
        }, 400);
    });
}
