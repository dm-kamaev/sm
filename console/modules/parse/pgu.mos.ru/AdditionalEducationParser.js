'use strict';

var await = require('asyncawait/await'),
    lodash = require('lodash'),
    services = require.main.require('./app/components/services').all,
    fs = require('fs'),
    path = require('path');

var geoConverter = require('../../geo/Converter'),
    CsvConverter = require('../../modelArchiver/CsvConverter'),
    SchoolSearcher = require('../SchoolSearcher'),
    Archiver = require('../../modelArchiver/Archiver'),
    confusionSchools = require('./confusionSchools.json'),
    availableFields = require('./availableFields.json'),
    additionalSpheres = require('./additionalSpheres.json');

const REMOVE_DUPLICATES = false;

class AdditionalEducationParser {

    /**
     * @public
     * @param {string} directory
     */
    constructor(directory) {
        this.PATH = directory;
    }

    /**
     * Parse extra education and add it to db
     * @public
     */
    process() {
        this.clearDb_();
        var activitiesBySchool = this.parse_();
        var addedActivities = this.addActivitiesToDb_(activitiesBySchool.slice(0, 2));

        this.writeToArchive_(addedActivities);
    }

    /**
     * Delete all additional educations
     * @private
     */
    clearDb_() {
        services.additionalEducation.deleteAll();
    }

    /**
     * Main method
     * @private
     * @param {string} directory
     * @return {array<object>}
     */
    parse_() {
        var activities = this.getActivities_(),
            schools = await(services.school.listInstances());

        var activitiesBySchool = this.filterActivitiesBySchool_(activities);

        var schoolSearcher = new SchoolSearcher(schools);
        var foundActivitiesBySchool = schoolSearcher.find(activitiesBySchool);

        return foundActivitiesBySchool;
    }

    /**
     * Write json to file
     * @param {array<object>} activities
     */
    writeToArchive_(activities) {
        var archiver = new Archiver(path.join(__dirname, 'addedActs.tar.gz'));

        archiver.compress(this.createCsv_(activities));
    }

    /**
     * @private
     * @param {array<object>} activities
     */
    createCsv_(activities) {
        var csvConverter = new CsvConverter(activities);
        return csvConverter.toCsv('|');
    }

    /**
     * @private
     * @param {array<object>} foundActivitiesBySchool
     * @return {array<object>}
     */
    addActivitiesToDb_(foundActivitiesBySchool) {
        var result = [];
        foundActivitiesBySchool.forEach(school => {
            Array.prototype.push.apply(
                result,
                this.addSchoolActivitiesToDb_(school)
            )
        });
        return result;
    }

    /**
     * @private
     * @param {object} school
     */
    addSchoolActivitiesToDb_(school) {
        var schoolId = school.id;
        var addedActivities = school.data.map(activity =>
            this.addActivityToDb_(schoolId, activity));
        return addedActivities;
    }

    /**
     * @private
     * @param {number} schoolId
     * @param {object} activity
     * @return {object}
     */
    addActivityToDb_(schoolId, activity) {
        var preparedActivity = this.prepareActivity_(schoolId, activity);
        var addedActivity = await(services.additionalEducation.create(
            preparedActivity
        ));
        preparedActivity.id = addedActivity.id;
        preparedActivity.createdAt = addedActivity.created_at.toJSON();
        preparedActivity.updatedAt = addedActivity.updated_at.toJSON();
        return preparedActivity;
    }

    /**
     * @private
     * @param {number} schoolId
     * @param {object} activity
     */
    prepareActivity_(schoolId, activity) {
        var preparedActivity = {},
            rawFields = {};

        preparedActivity.schoolId = schoolId;
        activity.sphere = activity.sphere
            .replace(/&nbsp;/g, '')
            .trim();
        preparedActivity.category = additionalSpheres[activity.sphere];

        var contact = activity.contact || '';
        activity.contact = contact.length > 255 ? '' : contact;

        for (var prop in activity) {
            if (activity[prop]) {
                if (availableFields.indexOf(prop) > -1) {
                    preparedActivity[prop] = activity[prop];
                } else {
                    rawFields[prop] = activity[prop];
                }
            }
        }

        preparedActivity.rawData = JSON.stringify(rawFields);

        return preparedActivity;
    }

    /**
     * Gets activities from file/directory
     * @private
     * @param {array<string>} fileNames
     * @return <array<object>
     */
    getActivities_() {
        var activities,
            fileNames = fs.readdirSync(this.PATH);

        if (REMOVE_DUPLICATES) {
            activities = this.removeDuplicates_(this.processFiles_(fileNames));
            fs.writeFileSync(
                this.PATH + 'pguFull.json',
                JSON.stringify(activities)
            );
        } else {
            activities = this.processFiles_(fileNames);
        }

        return activities;
    }

    /**
     * @private
     * @param {array<string>} fileNames
     * @return {array<object>}
     */
    processFiles_(fileNames) {
        var result = [],
            fullData = fileNames.indexOf('pguFull.json');

        if (fullData > -1) {
            result = this.parseFile_(this.PATH + fileNames[fullData], 2);
        } else {
            fileNames.forEach(file => {
                result = result.concat(this.parseFile_(this.PATH + file, 3));
            });
        }
        return result;
    };

    /**
     * @private
     * @param {string} file
     * @param {number} startPosition
     * @return {array<object>}
     */
    parseFile_(file, startPosition) {
        return fs.readFileSync(file, 'utf8')
            .slice(startPosition, -2)
            .split('},{')
            .map(obj => {
                return JSON.parse('{' + obj + '}');
            });
    }

    /**
     * @private
     * @param {array<object>} schools
     * @param {array<object>} activities
     * @return {array<object>}
     */
    matchData_(schools, activities) {
        var parsedSchools = this.parseSchools_(schools),
            parsedActs = this.parseActivities_(activities);

        return lodash.compact(parsedSchools.map(school => {
            var activities = lodash.find(parsedActs, schoolActivities => {
                return schoolActivities.schoolName === school.name;
            });
            if (activities) {
                return {
                    schoolId: school.id,
                    data: activities.data,
                    addresses: school.addresses
                };
            }
        }));
    }

    /**
     * @private
     * @param {array<object>} schools
     * @return {array<object>}
     */
    parseSchools_(schools) {
        return schools.map(school => {
            return {
                id: school.id,
                name: this.parseSchoolName_(school.abbreviation),
                addresses: school.addresses.map(adr => {
                    return adr.name;
                })
            };
        });
    }

    /**
     * @private
     * @param {array<object>} schools
     * @return {array<object>}
     */
    parseActivities_(activities) {
        var sortedBySchools = {},
            result = [];

        activities.forEach(activity => {
            var schoolName = this.parseSchoolName_(activity.school);
            if (sortedBySchools.hasOwnProperty(schoolName)) {
                sortedBySchools[schoolName].push(activity);
            } else {
                sortedBySchools[schoolName] = [activity];
            }
        });

        for (var school in sortedBySchools) {
            result.push({
                schoolName: school,
                data: sortedBySchools[school]
            });
        }

        return result;
    }

    /**
     * @private
     * @param {string} name
     */
    parseSchoolName_(name) {
        var parsedName = '';
        if (name) {
            parsedName = name
                .toLowerCase()
                .replace(/[«»"]/g, '')
                .replace(/(гбоу школа)|(гбоу сош)/g, '')
                .trim();
        }
        return parsedName;
    }

    /**
     * @private
     * @param {array<object>} array
     * @return {array<object>}
     */
    removeDuplicates_(array) {
        var i = array.length,
            uniqArray = [];
        console.log(i);
        while(i--) {
            if (!(i % 1000)) {
                process.stdout.clearLine();
                process.stdout.cursorTo(0);
                process.stdout.write('Removing duplicates: ' + i);
            }

            if (!lodash.find(uniqArray, array[i])) {
                uniqArray.push(array[i]);
            }
        }
        console.log(uniqArray.length);
        return uniqArray;
    }

    /**
     * @private
     * @param {array<object>} activities
     * @return {array<object>}
     */
    filterActivitiesBySchool_(activities) {
        var sortBySchool = {},
            result = [];
        var maxDescription = {
            text: '',
            length: 0
        };
        activities.forEach(activity => {
            maxDescription = activity.description.length >
                maxDescription.length ? {
                    length: activity.description.length,
                    text: activity.description
                }  : maxDescription;
            var schoolName = activity.school;
            if (confusionSchools.indexOf(schoolName) === -1 &&
                schoolName.indexOf('Москомспорта') === -1) {

                if (sortBySchool.hasOwnProperty(schoolName)) {
                    sortBySchool[schoolName].push(activity);
                } else {
                    sortBySchool[schoolName] = [activity];
                }
            }
        });

        for (var school in sortBySchool) {
            result.push({
                name: school,
                data: sortBySchool[school]
            });
        }

        return result;
    }

    /**
     * Create statistics on found spheres
     * Structure of output file:
     * sphere name:
     *     overallCount
     *     schoolCount
     *     names[]
     * @private
     * @param {array<object>} foundActivitiesBySchool
     */
    createSphereStats_(foundActivitiesBySchool) {
        var spheres = {};
        foundActivitiesBySchool.forEach(school => {
            var foundActivites = [];
            school.data.forEach(activity => {
                var sphere = activity.sphere;
                if (spheres.hasOwnProperty(sphere)) {
                    spheres[sphere].count++;
                    spheres[sphere].names.push(activity.name);
                    if (foundActivites.indexOf(sphere) === -1) {
                        spheres[sphere].schools++;
                        foundActivites.push(sphere);
                    }
                } else {
                    spheres[sphere] = {
                        count: 1,
                        schools: 1,
                        names: [activity.name]
                    };
                    foundActivites.push(sphere);
                }
            });
        });
        fs.writeFileSync('spheres.json', JSON.stringify(spheres));
    }
}

module.exports = AdditionalEducationParser;
