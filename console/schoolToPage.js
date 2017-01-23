'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    commander = require('commander'),
    path = require('path');

const services = require('../app/components/services').all,
    entityType = require('../api/modules/entity/enums/entityType'),
    CsvConverter = require('./modules/modelArchiver/CsvConverter'),
    Archiver = require('./modules/modelArchiver/Archiver');

const CSV_DELIMITER = '|';

class SchoolToPage {
    /**
     * Create archived csv with page data got from schools
     */
    createArchive() {
        var schools = await(services.school.listInstances()),
            archiver = new Archiver(path.join(__dirname, 'pageData.tar.gz'));

        archiver.compress(this.createCsv_(schools));
    }

    /**
     * @private
     * @param {Array<Object>} schools
     * @return {string}
     */
    createCsv_(schools) {
        var csvConverter = new CsvConverter(this.getFromSchools_(schools));

        return csvConverter.toCsv(CSV_DELIMITER);
    }

    /**
     * @private
     * @param {Array<Object>} schools
     * @return {Array<Object>}
     */
    getFromSchools_(schools) {
        return schools.map(school => this.getFromSchool_(school));
    }


    /**
     * @private
     * @param {Object} school
     * @return {Object}
     */
    getFromSchool_(school) {
        var currentDate = new Date();
        return {
            entityId: school.id,
            entityType: entityType.SCHOOL,
            alias: school.url,
            views: school.views,
            description: school.seoDescription,
            createdAt: currentDate.toJSON(),
            updatedAt: currentDate.toJSON()
        };
    }
}

var createFile = async(function() {
    var schoolToPage = new SchoolToPage();

    schoolToPage.createArchive();
});

commander
    .command('schoolToPage')
    .description('Creates archived csv for page table based on school data')
    .action(() => createFile());

exports.Command;
