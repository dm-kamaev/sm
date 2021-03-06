/**
 * @fileOverview Class to operate with districts in db
 * It can fill db with districts and fill relations between districts and areas
 * It can backup this relations and districts to use this archives in migrations
 *
 * To fill db with districts need use following sequence:
 * 1.) fillDbDistricts()
 * 2.) generateDistrictsRelationReport()
 * 3.) archiveDbDistricts()
 */

'use strict';

const path = require('path'),
    await = require('asyncawait/await');

const CsvConverter = require('../modelArchiver/CsvConverter'),
    Archiver = require('../modelArchiver/Archiver');

const services = require('../../../app/components/services').all;

var districts = require('./districts.json');

const CSV_DELIMITER = '|';

class DistrictProcessor {
    /**
     * Create districts and write it to db
     */
    fillDbDistricts() {
        districts.forEach(district => {
            var districtInstance = this.createDistrict_(district);

            district.areas.forEach(areaName => {
                this.associateAreaWithDistrict_(
                    areaName,
                    districtInstance.id
                );
            });
        });
    }


    /**
     * Generate report about relations between districts and areas
     * in json format, than archive it
     */
    generateDistrictsRelationReport() {
        var districts = await(services.district.getAllWithAreas()),
            report = districts.map(district => {
                return {
                    name: district.name,
                    areas: district.areas.map(area => area.name)
                };
            }),
            csvReport = JSON.stringify(report);

        this.archive_(csvReport, 'district-area-data.tar.gz');
    }


    /**
     * Create archive of district in db without their id,
     * then archive it
     */
    archiveDbDistricts() {
        var dbDistricts = await(services.district.getAllWithAreas()),
            date = new Date().toJSON(),
            formattedDistricts = dbDistricts.map(district => {
                return {
                    'name': district.name,
                    'center_coords': '{' + district.centerCoords.join() + '}',
                    'created_at': date,
                    'updated_at': date
                };
            }),
            csvDistricts = this.createCsv_(formattedDistricts);

        this.archive_(csvDistricts, 'dbDistricts.tar.gz');
    }


    /**
     * Create csv from given district data
     * @param {Array<{
     *     id: number,
     *     name: string
     * }>} districts
     * @return {string}
     * @private
     */
    createCsv_(districts) {
        var csvConverter = new CsvConverter(districts);

        return csvConverter.toCsv(CSV_DELIMITER);
    }


    /**
     * Create archive with given csv data on given path
     * @param {string} csvData
     * @param {string} fileName
     * @private
     */
    archive_(csvData, fileName) {
        var filePath = path.join(__dirname, fileName),
            archiver = new Archiver(filePath);

        archiver.compress(csvData);
    }

    /**
     * Create district and write it to db
     * @param {{
     *     name: string,
     *     centerCoords: Array<number>
     * }} districtData
     * @return {models.District}
     */
    createDistrict_(districtData) {
        return await(services.district.create(districtData));
    }


    /**
     * Associates area with given name and district with given id
     * @param {string} areaName
     * @param {number} districtId
     */
    associateAreaWithDistrict_(areaName, districtId) {
        await(services.area.updateByName(areaName, {
            districtId: districtId
        }));
    }
}

module.exports = DistrictProcessor;
