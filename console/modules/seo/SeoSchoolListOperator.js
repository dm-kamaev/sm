/**
 * @fileOverview Class to manipulate seo school lists - special 'seo' search
 * pages with predefined search parameters.
 * It can create seo_school_list table archive from schoolSeoLists.json - file
 * with possible predefined search types,
 * update search parameters in seo_school_list table, using schoolSeoLists.json,
 * generate possible aliases combinations for disabling index with query
 * parameters in robots.txt.
 * The schoolSeoLists.json must be in script folder for normal work.
 */
'use strict';


const await = require('asyncawait/await'),
    path = require('path'),
    fs = require('fs'),
    lodash = require('lodash');

const Archiver = require('../modelArchiver/Archiver'),
    CsvConverter = require('../modelArchiver/CsvConverter'),
    services = require('../../../app/components/services').all;

const schoolSeoLists = require('./schoolSeoLists.json');

const CSV_DELIMITER = '|',
    ROBOTS_REPORT = 'robots-report',
    ARCHIVE_FILE = 'seo-school-lists.tar.gz';

class SeoSchoolListOperator {

    /**
     * Generate rules for robots.txt in export file
     */
    generateRobotsRules() {
        var seoListsAliases = this.generateListsAliases_(schoolSeoLists);

        this.createRobotsRulesFile(seoListsAliases);
    }


    /**
     * Fills search parameters in school seo lists for different
     * variations of listType and geoType
     */
    createArchive() {
        var seoLists = this.generateLists_(schoolSeoLists),
            csv = this.createCsv_(seoLists);

        await(this.archive_(csv, ARCHIVE_FILE));
    }


    /**
     * Fill search parameters field in seo school lists table
     * schoolType and districtId parameters takes from existing tables in db
     */
    actualizeDbSearchParams() {
        var seoLists = this.generateLists_(schoolSeoLists);

        this.actualizeDbSearchParams_(seoLists);
    }


    /**
     * Generate array of possible seo lists aliases
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
     * @return {Array<string>}
     * @private
     */
    generateListsAliases_(types) {
        var schoolUrl = '/school',
            schoolTypeAliases = types.schoolTypes.map(schoolType => {
                return schoolUrl + '/' + schoolType.name;
            }),
            geoTypeAliases = types.geoTypes.map(geoType => {
                return schoolUrl + '/' + geoType.name;
            }),
            unFlattenedMixedTypeAliases = types.schoolTypes.map(schoolType => {
                return types.geoTypes.map(geoType => {
                    return schoolUrl + '/' + schoolType.name + '/' + geoType.name;
                });
            }),
            mixedTypeAliases = lodash.flatten(unFlattenedMixedTypeAliases);

        return [].concat(schoolTypeAliases)
            .concat(geoTypeAliases)
            .concat(mixedTypeAliases);
    }


    /**
     * Create or rewrite file with rules for robots.txt from given aliases
     * @param {Array<string>} aliases
     */
    createRobotsRulesFile(aliases) {
        var filePath = path.join(__dirname, ROBOTS_REPORT);

        if (!fs.existsSync(filePath)) {
            fs.open(filePath, "wx", function (err, fd) {
                fs.close(fd);
            });
        }
        fs.writeFileSync(filePath, '');

        aliases.map(alias => {
            var data = 'Disallow: ' + alias + '?*\n';
            fs.appendFileSync(filePath, data);
        });
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
     *         value: string,
     *         plural: (string|undefined),
     *
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
            'seo_title': this.generateSeoTitle_(listType, geoType, searchType),
            'seo_description':
                this.generateSeoDescription_(listType, geoType, searchType),
            'title': this.generateTitle_(listType, geoType, searchType),
            'text': null,
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
     * Generate meta title for given list type and geo type
     * @param {{
     *     name: string,
     *     value: string,
     *     plural: (string|undefined),
     *     genetive: (string|undefined),
     *     accusative: (string|undefined)
     * }} listType
     * @param {({
     *     name: string,
     *     value: string
     * }|undefined)} geoType
     * @param {string} searchType
     * @return {string}
     */
    generateSeoDescription_(listType, geoType, searchType) {
        var result = '';
        switch (searchType) {
        case 'institution':
            result =
                this.generateInstitutionSeoDescription_(listType);
            break;
        case 'district':
            result = this.generateDistrictSeoDescription_(listType);
            break;
        case 'mixed':
            result =
                this.generateMixedSeoDescription_(listType, geoType);
            break;
        }

        return result;
    }

    /**
     * Generate meta title for given institution type
     * @param {{
     *     name: string,
     *     value: string,
     *     plural: (string|undefined),
     *     genetive: (string|undefined),
     *     accusative: (string|undefined)
     * }} institution
     * @return {string}
     * @private
     */
    generateInstitutionSeoDescription_(institution) {
        return 'Список московских ' + institution.genetive +
            ' с возможностью фильтра и сортировки: по средним оценкам,' +
            ' по результатам экзаменов и олимпиад, ' +
            'по отзывам родителей и выпускников. ' +
            'Лучшие ' + institution.plural +
            ' города Москвы на одной странице!';
    }

    /**
     * Generate meta title for given district name
     * @param {{
     *     name: string,
     *     value: string
     * }} district
     * @return {string}
     * @private
     */
    generateDistrictSeoDescription_(district) {
        return this.generateMixedSeoDescription_(
            {
                plural: 'школы',
                genetive: 'школ'
            },
            district
        );
    }

    /**
     * Generate meta title for given institution type and district name
     * @param {{
     *     plural: string,
     *     genetive: string
     * }} institution
     * @param {{
     *     value: string
     * }} district
     * @return {string}
     * @private
     */
    generateMixedSeoDescription_(institution, district) {
        return 'Список ' + institution.genetive + ' ' + district.value +
            ' Москвы в удобном виде на одной странице. ' +
            this.capitalizeString_(institution.plural) + ' ' +
            district.value +
            ' с возможностью фильтра и сортировки по результатам экзаменов' +
            ' и олимпиад, отзывам родителей и выпускников.';
    }

    /**
     * Generate meta title for given list type and geo type
     * @param {{
     *     plural: (string|undefined),
     *     genetive: (string|undefined),
     *     accusative: (string|undefined)
     * }} listType
     * @param {({
     *     value: string
     * }|undefined)} geoType
     * @param {string} searchType
     * @return {string}
     */
    generateSeoTitle_(listType, geoType, searchType) {
        var result = '';

        switch (searchType) {
        case 'institution':
            result =
                this.generateInstitutionSeoTitle_(listType);
            break;
        case 'district':
            result = this.generateDistrictSeoTitle_(listType);
            break;
        case 'mixed':
            result =
                this.generateMixedSeoTitle_(listType, geoType);
            break;
        }

        return result;
    }

    /**
     * Generate meta title for given institution type
     * @param {{
     *     plural: string,
     *     genetive: string,
     *     accusative: string
     * }} institution
     * @return {string}
     * @private
     */
    generateInstitutionSeoTitle_(institution) {
        return this.generateInstitutionTitle_(institution.plural) + '. ' +
            'Выбирайте ' + institution.accusative +
            ' для поступления! Школы Мела.';
    }

    /**
     * Generate meta title for given district name
     * @param {{
     *     value: string
     * }} district
     * @return {string}
     * @private
     */
    generateDistrictSeoTitle_(district) {
        return this.generateDistrictTitle_(district.value) + '. Школы Мела.';
    }

    /**
     * Generate meta title for given institution type and district name
     * @param {{
     *     name: string,
     *     value: string,
     *     plural: string
     * }} institution
     * @param {{
     *     name: string,
     *     value: string
     * }} district
     * @return {string}
     * @private
     */
    generateMixedSeoTitle_(institution, district) {
        return this.generateMixedTitle_(
                institution.plural, district.value
            ) + ' . Школы Мела.';
    }


    /**
     * Generate h1 title for given list type and geo type
     * @param {{
     *     name: string,
     *     value: string,
     *     plural: (string|undefined),
     *     genetive: (string|undefined),
     *     accusative: (string|undefined)
     * }} listType
     * @param {({
     *     name: string,
     *     value: string
     * }|undefined)} geoType
     * @param {string} searchType
     * @return {string}
     */
    generateTitle_(listType, geoType, searchType) {
        var result = '';
        switch (searchType) {
        case 'institution':
            result =
                this.generateInstitutionTitle_(listType.plural);
            break;
        case 'district':
            result = this.generateDistrictTitle_(listType.value);
            break;
        case 'mixed':
            result =
                this.generateMixedTitle_(listType.plural, geoType.value);
            break;
        }

        return result;
    }


    /**
     * Generate h1 title for given institution type
     * @param {string} institutionType
     * @return {string}
     * @private
     */
    generateInstitutionTitle_(institutionType) {
        return this.capitalizeString_(institutionType) + ' Москвы';
    }

    /**
     * Generate h1 title for given district name
     * @param {string} districtName
     * @return {string}
     * @private
     */
    generateDistrictTitle_(districtName) {
        return 'Школы ' + districtName + ' Москвы';
    }

    /**
     * Generate h1 title for given institution type and district name
     * @param {string} institutionType
     * @param {string} districtName
     * @return {string}
     * @private
     */
    generateMixedTitle_(institutionType, districtName) {
        return this.capitalizeString_(institutionType) + ' ' +
            districtName + ' Москвы';
    }


    /**
     * Capitalizes given string
     * @param {string} string
     * @return {string}
     * @private
     */
    capitalizeString_(string) {
        return ''.concat(string.charAt(0).toUpperCase() + string.slice(1));
    }

    /**
     * Generate search parameters from given listType and geo type.
     * Search for district id and school type id by given values of each type
     * @param {{
     *     name: string,
     *     value: string,
     *     seoTextForm: (string|undefined)
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
