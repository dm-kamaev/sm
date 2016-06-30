'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    path = require('path'),
    squel = require('squel');

const Archiver = require('../modelArchiver/Archiver'),
    CsvConverter = require('../modelArchiver/CsvConverter'),
    services = require('../../../app/components/services').all,
    sequelize = require('../../../app/components/db');

const seoPageAliases = require('./seoPageAliases.json'),
    seoSchoolLists = require('./seoSchoolLists.json');

const CSV_DELIMITER = '|';

class SeoPageOperator {

    /**
     * Create seo pages in db via raw query
     * @param {string} archivePath
     */
    createDbSeoPagesFromArchive(archivePath) {
        var archiver = new Archiver(archivePath),
            jsonPages = await(archiver.decompress()),
            pages = JSON.parse(jsonPages);


        pages.forEach(page => {
           this.createDbPage_(page);
        });
    }

    /**
     * Create archive from seoPageAliases json
     */
    createSeoPagesArchive() {
        var data = seoPageAliases.map(alias => {
                return {
                    entityId: null,
                    entityType: 'school',
                    alias: alias
                };
            }),
            jsonData = JSON.stringify(data);

        this.archive_(jsonData, 'seo-page-alias.tar.gz');
    }

    /**
     * Create archive from seoSchoolLists json with csv for loading to db
     */
    createSeoSchoolListsArchive() {
        var date = new Date().toJSON(),
            data = seoSchoolLists.map(seoSchoolList => {
                return {
                    description: seoSchoolList.description ?
                        seoSchoolList.description :
                        null,
                    'seo_text': seoSchoolList.seoText ?
                        '{' + seoSchoolList.seoText.join() + '}' :
                        null,
                    'search_parameters':
                        '{' +
                        seoSchoolList.searchParameters.map(parameter => {
                            return '{' + parameter.join() + '}';
                        }).join() +
                        '}',
                    'list_type': seoSchoolList.listType,
                    'geo_type': seoSchoolList.geoType,
                    'created_at': date,
                    'updated_at': date
                };
            });

        var csvConverter = new CsvConverter(data);
        await(this.archive_(
            csvConverter.toCsv(CSV_DELIMITER),
            'seo-school-lists.tar.gz'
        ));
    }


    /**
     * Create one page in db via raw query
     * @param {{
     *     entityId: ?number,
     *     entityType: string,
     *     alias: string
     * }} pageData
     */
    createDbPage_(pageData) {
        var date = new Date().toJSON(),
            query = squel.insert()
                .into('page')
                .set('entity_id', pageData.entityId)
                .set('entity_type', pageData.entityType)
                .set('alias', pageData.alias)
                .set('created_at', date)
                .set('updated_at', date)
                .toString();

        await(sequelize.query(
            query,
            {
                type: sequelize.QueryTypes.INSERT
            }
        ));
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


}

module.exports = SeoPageOperator;
