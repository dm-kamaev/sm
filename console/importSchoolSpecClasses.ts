'use strict';

const commander  = require('commander');

const Archiver = require('./modules/modelArchiver/Archiver');
const CsvConverter = require('./modules/modelArchiver/CsvConverter');

const DELIMITER = '|';
const IMPORT_FILE_NAME = 'schoolSpecClasses.tar.gz';

import {
    service as schoolSpecializedClassService
} from '../api/modules/school/services/schoolSpecializedClass';

import {SchoolSpecClassExtractor} from
    './modules/schoolSpecClasses/SchoolSpecClassExtractor';

const importClasses = async function() {
    const schoolSpecClassMigrator = new SchoolSpecClassExtractor();
    const schoolSpecClasses = await schoolSpecClassMigrator.extract();

    const archiver = new Archiver(`./${IMPORT_FILE_NAME}`);
    const csvConverter = new CsvConverter(schoolSpecClasses.map(
        (specClass, index) => {
            const now = new Date().toJSON();
            specClass.createdAt = now;
            specClass.updatedAt = now;
            return specClass;
        }
    ));

    const csvData = await csvConverter.toCsv(DELIMITER);
    await archiver.compress(csvData);
};

commander
    .command('importSchoolSpecClasses')
    .description('Import specialized classes from school table to csv in ' +
        'schoolSpecializedClass table format')
    .action(() => importClasses());
