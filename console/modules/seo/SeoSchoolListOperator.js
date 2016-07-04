'use strict';

'use strict';

const await = require('asyncawait/await'),
    path = require('path'),
    lodash = require('lodash');

const Archiver = require('../modelArchiver/Archiver'),
    CsvConverter = require('../modelArchiver/CsvConverter'),
    services = require('../../../app/components/services').all;

const schoolSeoLists = require('./schoolSeoLists.json');

const CSV_DELIMITER = '|';

class SeoSchoolListOperator {


    /**
     * Fills search parameters in school seo lists for different
     * variations of listType and geoType
     */
    createArchive() {
        var seoLists = this.generateLists_(schoolSeoLists),
            csv = this.createCsv_(seoLists);

        await(this.archive_(csv, 'seo-school-lists.tar.gz'));
    }


    actualizeDbSearchParams() {
        var seoLists = this.generateLists_(schoolSeoLists);

        this.actualizeDbSearchParams_(seoLists);
    }


    /**
     * Generate objects of seo school lists
     * @param {{
     *     schoolType: Array<{
     *         name: string,
     *         value: string
     *     }>,
     *     geoType: Array<{
     *         name: string,
     *         value: string
     *     }>
     * }} types
     * @return {Array<{
     *     description: string,
     *     seo_text: string,
     *     search_parameters: string,
     *     list_type: string,
     *     geo_type: string,
     *     created_at: Date,
     *     updated_at: Date
     * }>}
     * @private
     */
    generateLists_(types) {
        var schoolTypeLists = types.schoolTypes.map(schoolType => {
                return this.generateList_({
                    listType: schoolType,
                    geoType: null,
                    searchType: 'institution'
                });
            }),
            geoTypeLists = types.geoTypes.map(geoType => {
                return this.generateList_({
                    listType: geoType,
                    geoType: null,
                    searchType: 'district'
                });
            }),
            unFlattenedMixedTypeLists = types.schoolTypes.map(schoolType => {
                return types.geoTypes.map(geoType => {
                    return this.generateList_({
                        listType: schoolType,
                        geoType: geoType,
                        searchType: 'mixed'
                    });
                });
            }),
            mixedTypeLists = lodash.flatten(unFlattenedMixedTypeLists);

        return [].concat(schoolTypeLists)
            .concat(geoTypeLists)
            .concat(mixedTypeLists);
    }


    /**
     * Actualizes search params for seo_school_lists in db
     * @param {Array<{
     *     description: string,
     *     seo_text: string,
     *     search_parameters: string,
     *     list_type: string,
     *     geo_type: string,
     *     created_at: Date,
     *     updated_at: Date
     * }>} schoolLists
     * @private
     */
    actualizeDbSearchParams_(schoolLists) {
        schoolLists.forEach(schoolList => {
            this.actualizeParamsByType_({
                listType: schoolList.list_type,
                geoType: schoolList.geo_type,
                searchParameters: schoolList.search_parameters
            });
        });
    }


    /**
     * Actualizes params for school list, found by combination of
     * school type and geo type
     * @param {{
     *     listType: string,
     *     geoType: ?string,
     *     searchParameters: string
     * }} data
     * @private
     */
    actualizeParamsByType_(data) {
        await(services.seoSchoolList.updateByType(
            {
                listType: data.listType,
                geoType: data.geoType
            },
            {
                searchParameters: data.searchParameters
            }
        ));
    }


    /**
     * Generates school seo list data
     * @param {{
     *     listType: {
     *         name: string,
     *         value: string
     *     },
     *     geoType: ({
     *         name: string,
     *         value: string
     *     }|undefined),
     *     searchType: string
     * }} itemData
     * @return {{
     *     description: string,
     *     seo_text: string,
     *     search_parameters: string,
     *     list_type: string,
     *     geo_type: string,
     *     created_at: Date,
     *     updated_at: Date
     * }}
     * @private
     */
    generateList_(itemData) {
        var listType = itemData.listType,
            geoType = itemData.geoType,
            searchType = itemData.searchType,
            date = new Date().toJSON();
        return {
            'seo_title': null,
            'seo_text': null,
            'search_parameters': JSON.stringify(
                this.generateSearchParameters_(listType, geoType, searchType)
            ),
            'list_type': listType.name,
            'geo_type': geoType ? geoType.name : null,
            'created_at': date,
            'updated_at': date
        };
    }


    /**
     * Generate search parameters from given listType and geo type.
     * Search for district id and school type id by given values of each type
     * @param {{
     *     name: string,
     *     value: string
     * }} listType
     * @param {({
     *     name: string,
     *     value: string
     * }|undefined)} geoType
     * @param {string} searchType
     * @return {{
     *     districtId: ?number,
     *     schoolType: ?number
     * }}
     * @private
     */
    generateSearchParameters_(listType, geoType, searchType) {
        var result = {};
        switch (searchType) {
        case 'institution':
            result =
                this.generateInstitutionSearchParams_(listType.value);
            break;
        case 'district':
            result = this.generateDistrictSearchParams_(listType.value);
            break;
        case 'mixed':
            result =
                this.generateMixedSearchParams_(listType.value, geoType.value);
            break;
        }

        return result;
    }

    /**
     * Generate search params for schoolType filter conditions case
     * @param {string} listType
     * @return {{
     *     schoolType: ?number
     * }}
     * @private
     */
    generateInstitutionSearchParams_(listType) {
        return {
            schoolType: [this.getSchoolTypeId_(listType)]
        };
    }

    /**
     * Generate search params for district filter conditions case
     * @param {string} listType
     * @return {{
     *     districtId: ?number,
     *     name: string
     * }}
     * @private
     */
    generateDistrictSearchParams_(listType) {
        return {
            districtId: this.getDistrictId_(listType),
            name: listType
        };
    }


    /**
     * Generate search params for schoolType and district filter conditions case
     * @param {string} listType
     * @param {string} geoType
     * @return {{
     *     schoolType: ?number,
     *     districtId: ?number,
     *     name: string
     * }}
     * @private
     */
    generateMixedSearchParams_(listType, geoType) {
        return {
            schoolType: [this.getSchoolTypeId_(listType)],
            districtId: this.getDistrictId_(geoType),
            name: geoType
        };
    }

    /**
     * Get schoolTypeId by given schoolTypeName from db
     * @param {string} schoolTypeName
     * @return {?number}
     * @private
     */
    getSchoolTypeId_(schoolTypeName) {
        var schoolType =
            await(services.search.getTypeFilterByValue(schoolTypeName));

        return schoolType ? schoolType.id : null;
    }


    /**
     * Return district id by their name
     * @param {string} districtName
     * @return {?number}
     * @private
     */
    getDistrictId_(districtName) {
        var district = await(services.district.getByName(districtName));

        return district ? district.id : null;
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
     * Create csv from given data
     * @param {Object} data
     * @return {string}
     * @private
     */
    createCsv_(data) {
        var csvConverter = new CsvConverter(data);

        return csvConverter.toCsv(
            CSV_DELIMITER,
            {
                notCureQuotes: true
            }
        );
    }


}

module.exports = SeoSchoolListOperator;

