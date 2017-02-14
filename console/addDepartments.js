'use strict';

const commander = require('commander'),
    async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    Converter = require('csvtojson').Converter,
    lodashCompact = require('lodash/compact');

const services = require('../app/components/services').all,
    CsvConverter = require('./modules/modelArchiver/CsvConverter'),
    Archiver = require('./modules/modelArchiver/Archiver');

const INPUT_DELIMITER = ',',
    HEADERS = [
        'schoolId',
        'schoolName',
        'schoolSite',
        'addressId',
        'addressName',
        'name',
        'range'
    ],
    OUTPUT_DELIMITER = '|';

class DepartmentCreator {
    /**
     * @param {string} filePath
     */
    create(filePath) {
        var departmentsData = await(this.openCsv_(filePath)),
            addedDepartments = this.addToDb_(departmentsData),
            archiver = new Archiver('./newDepartments.tar.gz');

        archiver.compress(this.createCsv_(addedDepartments));
    }

    /**
     * @private
     * @param {string} filePath
     * @return {Promise<Array<Object>>}
     */
    openCsv_(filePath) {
        var converter = new Converter({
            delimiter: INPUT_DELIMITER,
            headers: HEADERS
        });

        return new Promise((resolve, reject) => {
            converter.fromFile(filePath, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    /**
     * @private
     * @param {Array<Object>} departments
     * @return {string}
     */
    createCsv_(departments) {
        var csvConverter = new CsvConverter(departments.map(department =>
            this.formatDepartment_(department)
        ));

        return csvConverter.toCsv(OUTPUT_DELIMITER);
    }

    /**
     * @private
     * @param {Object} department
     * @return {Object}
     */
    formatDepartment_(department) {
        var currentDate = new Date().toJSON();
        return {
            id: department.id,
            name: department.name,
            createdAt: currentDate,
            updatedAt: currentDate,
            addressId: department.addressId,
            educationalGrades: this.toPgArray_(department.educationalGrades)
        };
    }

    /**
     * @private
     * @param {Array<number>} range
     * @return {string}
     */
    toPgArray_(range) {
        return range || range === 0 ? '{' + range.toString() + '}' : null;
    }

    /**
     * @private
     * @param {Array<Object>} departmentsData
     * @return {Array}
     */
    addToDb_(departmentsData) {
        return lodashCompact(departmentsData.map(department => {
            if (department.name || department.range) {
                var addedDepartment = this.addDepartment_(department);
                addedDepartment.addressId = department.addressId;
                return addedDepartment;
            }
        }));
    }

    /**
     * @private
     * @param {Object} department
     * @return {Array<Object>}
     */
    addDepartment_(department) {
        return services.department.addDepartment(
            department.schoolId,
            department.addressId, {
                name: department.name,
                educationalGrades: this.rangeToArray_(department.range)
            }
        );
    }

    /**
     * @private
     * @param {(string|number)} range
     * @return {(Array<number>|null)}
     */
    rangeToArray_(range) {
        var resultArray;
        if (typeof range === 'number') {
            resultArray = [range];
        } else if (!range) {
            resultArray = null;
        } else {
            resultArray = range.split(',');
        }
        console.log(resultArray);
        return resultArray;
    }
}

var addDepartments = async(function(filePath) {
    var departmentCreator = new DepartmentCreator();

    departmentCreator.create(filePath);
});

commander
    .command('addDepartments')
    .description('Add missing departments from given *.csv')
    .action((filePath) => addDepartments(filePath));

exports.Command;
