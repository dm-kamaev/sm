'use strict';

var types = require('./schoolTypes.json');
var lodash = require('lodash');
var sameNumberSchools = require('./sameNumberSchools.json');

class SchoolSearcher {

    /**
     * @public
     * @param {array<object>} schools
     */
    constructor(schools) {

        /**
         * @private
         * @type {array<object>}
         */
        this.schools_ = this.parseSchools_(schools);

        /**
         * @private
         * @type {array}
         */
        this.notFoundSchools_ = [];
    }

    /**
     * Get all not found schools from given array
     * @public
     * @return {?array<object>}
     */
    getNotFoundSchools() {
        return this.notFoundSchools_;
    }

    /**
     * Finds db schools matches on given schools
     * @public
     * @param {array<object>} schools
     * @return {array<object>}
     */
    find(schools) {
        var convertedSchools = this.parseSchools_(schools);

        return lodash.compact(
            convertedSchools.map(school => {
                var match = this.findByName_(school) ||
                    this.findByNumber_(school) ||
                    this.findByInQuotes_(school) ||
                    this.findByRest_(school);

                if (match) {
                    return match;
                } else {
                    this.notFoundSchools_.push(school);
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
            return this.parseSchool_(school);
        });
    }


    /**
     * @private
     * @param {object} school
     * @return {object}
     */
    parseSchool_(school) {
        var name = school.name,
            result = {
                id: school.id,
                name: name,
                number: this.getNumber_(name),
                inQuotes: this.getInQuotes_(name),
                type: this.getType_(name),
                data: school.data
            }

        result.rest = this.getRest_(result);

        return result;
    }

    /**
     * @private
     * @param {object} school
     * @return {(object|undefined)}
     */
    findByName_(school) {
        var foundCount = 0;

        this.schools_.forEach(dbSchool => {
            if (dbSchool.name === school.name) {
                school.id = dbSchool.id;
                foundCount++;
            }
        });

        return this.returnResult_(foundCount, school.name) ? school :
            undefined;
    }

    /**
     * @private
     * @param {object} school
     * @return {(object|undefined)}
     */
    findByNumber_(school) {
        var foundCount = 0;

        this.schools_.forEach(dbSchool => {
            var dbSchoolName = dbSchool.name;

            if (dbSchool.number &&
                dbSchool.number === school.number &&

                !lodash.find(sameNumberSchools, sameNumberSchool => {
                    return sameNumberSchool.name === dbSchoolName;
                })
            ) {

                school.id = dbSchool.id;
                foundCount++;

            } else if (dbSchool.number &&
                dbSchool.number === school.number &&

                dbSchool.type === school.type
            ) {

                school.id = dbSchool.id;
                foundCount++;
            }
        });

        return this.returnResult_(foundCount, school.name) ? school :
            undefined;
    }

    /**
     * @private
     * @param {object} school
     * @return {(object|undefined)}
     */
    findByInQuotes_(school) {
        var foundCount = 0;

        this.schools_.forEach(dbSchool => {
            if (dbSchool.inQuotes &&
                dbSchool.inQuotes === school.inQuotes
            ) {
                school.id = dbSchool.id;
                foundCount++;
            }
        });

        return this.returnResult_(foundCount, school.name) ? school :
            undefined;
    }

    /**
     * @private
     * @param {object} school
     * @return {(object|undefined)}
     */
    findByRest_(school) {
        var foundCount = 0;

        this.schools_.forEach(dbSchool => {
            if (dbSchool.rest &&
                dbSchool.rest === school.rest
            ) {
                school.id = dbSchool.id;
                foundCount++;
            }
        });

        return this.returnResult_(foundCount, school.name) ? school :
            undefined;
    }

    /**
     * @private
     * @param {number} foundCount
     * @param {string} schoolName
     * @return {(bool|undefined|error)}
     */
    returnResult_(foundCount, schoolName) {
        if (foundCount > 1) {
            throw new Error('Found few matches: ' + schoolName);
        } else if (foundCount === 1) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @private
     * @param {string} name
     * @return {number}
     */
    getNumber_(name) {
        var numbers = name.match(/[0-9]+/g);
        return numbers && numbers[0] || '';
    }

    /**
     * @private
     * @param {string} name
     * @return {string}
     */
    getInQuotes_(name) {
        var inQuotes = name.match(/["«].*["»]/g);
        inQuotes = inQuotes && inQuotes[0].slice(1, -1).toLowerCase() || '';

        var insideQuote = inQuotes.indexOf('"') > -1 ? inQuotes.indexOf('"') :
            inQuotes.indexOf('«');

        return insideQuote > -1 ? inQuotes.slice(++insideQuote) : inQuotes;
    }

    /**
     * @private
     * @param {string} name
     * @return {string}
     */
    getType_(name) {
        var result = '';
        types.forEach(type => {
            type = type.trim().toLowerCase();
            if (name.toLowerCase().indexOf(type) > -1) {
                result = type;
            }
        });
        return result;
    }

    /**
     * @private
     * @param {object} parsedSchool
     * @return {string}
     */
    getRest_(parsedSchool) {
        return parsedSchool.name
            .toLowerCase()
            .replace(parsedSchool.number, '')
            .replace(parsedSchool.inQuotes, '')
            .replace(parsedSchool.type, '')
            .replace(/[#№«»" -]/g, '');
    }
}

module.exports = SchoolSearcher;
