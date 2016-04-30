'use strict';
var commander = require('commander');
var lodash = require('lodash');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var services = require.main.require('./app/components/services').all;
const fs = require('fs');

var geoConverter = require('./modules/geo/Converter.js'),
    SchoolSearcher = require('./modules/parse/SchoolSearcher'),
    confusionSchools = require('./parsePguActsConfusionSchools.json');

const REMOVE_DUPLICATES = false;

class ParseActs {

    /**
     * @public
     * @param {string} directory
     */
    constructor(directory) {
        this.PATH = directory;
    }

    /**
     * Main method
     * @public
     * @param {string} directory
     */
    parse() {
        var activities = this.getActivities_(),
            schools = await(services.school.listInstances());

        var activitiesBySchool = this.filterActivitiesBySchool_(activities);

        var schoolSearcher = new SchoolSearcher(schools);
        var foundActivitiesBySchool = schoolSearcher.find(activitiesBySchool);

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

        // await(services.school.deleteAdditionalEducations());
        // matchedData.forEach(schoolActivities => {
        //     await(services.school.createAdditionalEducations(schoolActivities));
        // });

        // var array = [],
        //     arr = [],
        //     acts = [];
        // matchedData.forEach(sch => {
        //     sch.data.forEach(act => {
        //         acts.push(act);
        //     });
        // });
        // console.log('asdasdasdasd: ' + acts.length);
        // matchedData.forEach(school => {
        //     school.data.forEach(activity => {
        //         var isFound = false;
        //         school.addresses.forEach(address => {
        //             if (geoConverter.convertAddress(activity.address)
        //                 .indexOf(geoConverter.convertAddress(address)) > -1) {
        //                     isFound = true;
        //             }
        //         })
        //         if (!isFound) {
        //             array.push(activity);
        //         } else {
        //             arr.push(activity)
        //         }
        //     });
        // });
        // console.log(array.length, arr.length);



        // await(services.school.createAdditionalEducations({
        //     schoolId: 1,
        //     data: [
        //         {
        //             name: 'FOOTBALLLL'
        //         },
        //         {
        //             name: 'SOCCER'
        //         }
        //     ]
        // }));
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
        console.log(maxDescription);
        return result;
    }
}

var startScript = async(function(directory) {
    var parseActs = new ParseActs(directory);
    await(parseActs.parse());
});

commander
    .command('parsePguActs <path>')
    .description('Parse pgu.mos.ru activities from a given directory')
    .action(directory => startScript(directory));

exports.Command;
