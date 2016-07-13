/**
 * @fileOverview Class, developed for manipulate specialized classes of schools
 */

'use strict';

const lodash = require('lodash'),
    await = require('asyncawait/await'),
    path = require('path');

const Archiver = require('../modelArchiver/Archiver'),
    CsvConverter = require('../modelArchiver/CsvConverter'),
    formatter = require('../utils/format');

const services = require('../../../app/components/services').all;

const SCHOOL_TABLE_ARCHIVE = 'schools.tar.gz',
    TYPE_TABLE_ARCHIVE = 'specialized-class-type.tar.gz';


class SpecializedClassesOperator {

    /**
     * Get unique types from schools specialized classes,
     * write it to db, update specialized_classes field in school then
     * archive types and schools
     */
    archiveDbTypes() {
        var schoolDbTypes = this.getDbTypes_(),
            uniqueTypes = this.getUniqueTypesWithPopularity_(schoolDbTypes),
            dbTypes = await(this.fillTypesTable_(uniqueTypes)),
            updatedSchools = await(this.updateSchoolValues_(dbTypes));

        this.archiveSchools_(updatedSchools);
        this.archiveTypes_(dbTypes);
    }


    /**
     * Get array of all specialized classes types from db.
     * Values may be not unique.
     * @return {Array<string>}
     * @private
     */
    getDbTypes_() {
        var dbSchools = this.getDbSchools_(),
            dbTypes = dbSchools.reduce(
                (previousValue, currentValue) => {
                    var specializedClasses = currentValue.specializedClasses;
                    /** if specialized classes not null, add all
                     * specialized classes names to array of dbTypes **/
                    if (specializedClasses) {
                        specializedClasses.forEach(specializedClass => {
                            previousValue.push(specializedClass[1]);
                        });
                    }
                    return previousValue;
                },
                []
            );

        return dbTypes;
    }

    /**
     * Return array of unique types from given types of array and calculate
     * their popularity
     * @param {Array<string>} types
     * @return {Array<{
     *     name: string,
     *     popularity: number
     * }>}
     * @private
     */
    getUniqueTypesWithPopularity_(types) {
        var uniqueTypes = lodash.uniq(types);

        return uniqueTypes.map(uniqueType => {
            return {
                name: uniqueType,
                popularity: this.calculatePopularity_(types, uniqueType)
            };
        });
    }


    /**
     * Calculate how much times type with typename enter in types
     * @param {Array<string>} types
     * @param {string} typeName
     * @return {number}
     * @private
     */
    calculatePopularity_(types, typeName) {
        var typesWithGivenName = types.filter(type => {
            return type == typeName;
        });

        return typesWithGivenName.length;
    }


    /**
     * Write types to specialized_class_type table ion db
     * @param {Array<string>} types
     * @return {Array<models.SpecializedClasses>}
     * @private
     */
    fillTypesTable_(types) {
        return types.map(type => {
            return await(services.specializedClassType.create(type));
        });
    }


    /**
     * Update specialized classes in schools:
     * change specialized classes names to their id
     * and return updated schools
     * @param {Array<models.SpecializedClasses>} dbTypes
     * @return {Array<models.School>}
     * @private
     */
    updateSchoolValues_(dbTypes) {
        var dbSchools = this.getDbSchools_(),
            dbSchoolsWithSpecializedClasses =
                dbSchools.filter(school => school.specializedClasses);

        return dbSchoolsWithSpecializedClasses.map(school => {
            var specializedClasses = school.specializedClasses,
                updatedSpecializedClasses =
                    this.updateSchoolSpecializedClasses_(
                        specializedClasses, dbTypes
                    );

            return await(services.school.update(school.id, {
                specializedClasses: updatedSpecializedClasses
            }));
        });
    }

    /**
     * Transform names of specialized classes given from school to
     * their id in db
     * @param {Array<Array<(string|number)>>} schoolSpecializedClasses
     * @param {Array<{
     *     id: number,
     *     name: string
     * }>} dbTypes
     * @return {Array<Array<number>>}
     * @private
     */
    updateSchoolSpecializedClasses_(schoolSpecializedClasses, dbTypes) {
        return schoolSpecializedClasses.map(specializedClass => {
            var currentType = dbTypes.find(dbType => {
                return dbType.name == specializedClass[1];
            });

            return [specializedClass[0], currentType.id];
        });
    }


    /**
     * Archive id and specializedClasses of given updated schools
     * @param {Array<models.School>} schools
     * @private
     */
    archiveSchools_(schools) {
        var preparedSchools = schools.map(school => {
                return {
                    id: school.id,
                    'specialized_classes': formatter.prepareArrayForDb(
                        school.specializedClasses
                    )
                };
            }),
            csv = CsvConverter.createCsv(preparedSchools);

        this.archive_(csv, SCHOOL_TABLE_ARCHIVE);
    }

    /**
     * Archive given db specialized classes types
     * @param {Array<models.School>} dbTypes
     * @private
     */
    archiveTypes_(dbTypes) {
        var date = new Date().toJSON(),
            preparedTypes = dbTypes.map(type => {
                return {
                    id: type.id,
                    name: type.name,
                    popularity: type.popularity,
                    'updated_at': date,
                    'created_at': date
                };
            }),
            csv = CsvConverter.createCsv(preparedTypes);

        this.archive_(csv, TYPE_TABLE_ARCHIVE);
    }


    /**
     * Return all schools in db
     * @return {Array<models.School>}
     * @private
     */
    getDbSchools_() {
        return await(services.school.listInstances());
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

module.exports = SpecializedClassesOperator;
