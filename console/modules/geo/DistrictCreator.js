'use strict';

const await = require('asyncawait/await');
const models = require('../../../app/components/models').all;
const services = require('../../../app/components/services').all;

class DistrictCreator {
    constructor() {}

    /**
     * Create districts and write it to db
     */
    createDistricts() {
        var districts = [
            {
                name: 'ЦАО',
                centerCoords: []
            },
            {
                name: 'САО',
                centerCoords: []
            },
            {
                name: 'СВАО',
                centerCoords: []
            },
            {
                name: 'ВАО',
                centerCoords: []
            },
            {
                name: 'ЮВАО',
                centerCoords: []
            },
            {
                name: 'ЮАО',
                centerCoords: []
            },
            {
                name: 'ЮЗАО',
                centerCoords: []
            },
            {
                name: 'ЗАО',
                centerCoords: []
            },
            {
                name: 'СЗАО',
                centerCoords: []
            },
            {
                name: 'ЗелАО',
                centerCoords: []
            },
            {
                name: 'ТАО',
                centerCoords: []
            },
            {
                name: 'НАО',
                centerCoords: []
            }
        ];

        districts.forEach(district => {
            this.createDistrict(district);
        });
    }

    /**
     * Create district and write it to db
     * @param {{
     *     name: string,
     *     centerCoords: Array<number>
     * }} districtData
     */
    createDistrict(districtData) {
        console.log(services.district);
        
        await(services.district.create(districtData));
    }
}

module.exports = DistrictCreator;
