var lodash = require('lodash');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var commander = require('commander');
var xlsx = require('node-xlsx');
var colors = require('colors');

var sequelize = require.main.require('./app/components/db');

var parseAreas = require('./parse_area');

var modules = require.main.require('./api/modules');
var services = require.main.require('./app/components/services').all;

var replace = require('./parseConfig').replace;
var ignore = require('./parseConfig').ignore;
var exclusion = require('./parseConfig').exclusion;

var GOVERMENT_KEY_INDEX = 2,
    NAME_INDEX = 6,
    FULL_NAME_INDEX = 5,
    DIRECTOR_INDEX = 13,
    PHONES_INDEX = 15,
    SITE_INDEX = 17,
    ADDRESSES_INDEX = 20,
    EDU_PROGRAMM_INDEX = 21,
    SUBJECT_INDEX = 37,
    GIA_COUNT_INDEX = 38,
    GIA_RESULTS_INDEX = 39,
    OLIMP_TYPE_INDEX = 30,
    OLIMP_STAGE_INDEX = 31,
    OLIMP_CLASS_INDEX = 32,
    OLIMP_SUBJECT_INDEX = 33,
    OLIMP_STATUS_INDEX = 34,
    OLIMP_YEAR_INDEX = 35;

/**
 * main parse method
 */
var parse = async(path => {
    sequelize.options.logging = false;
    var parsed = xlsx.parse(path),
        data = parsed[0].data;

    var moscow = await(services.city.getMoscow());

    data.map(rowParse)
        .filter((item, index) =>
            (index > 0) &&
            notIgnor(item.school.schoolType))
        .forEach((item) => {
            item.school.cityId = moscow.id;
            var school = await(parseSchool(item.school));

            if(item.giaResult.length) {
                initGiaResults(item.giaResult, school.id);
            }
            if (item.olimpResult.length) {
                services.studyResult.setSchoolOlimp(school, item.olimpResult);
            }
        });

    data = data.slice(1);

    parseAreas.parseAreas(data);
});

/**
 * helper for nameParse - gets Name
 * @param {Array} arr
 * @returns {*}
 */
var getName = arr => {
    return arr[0];
};

/**
 * helper for nameParse - gets Type
 * @param {Array} arr
 * @returns {*}
 */
var getType = arr => {
    if (arr.length > 1){
        return arr[1];
    } else {
        return 'unknown';
    }
};

/**
 * Name parser
 * @param {string} item
 * @returns {Array.<Object>}
 */
var nameParse = item => {
    var str = item;
    var arr = [];
    var flag = true;

    for (var newName in replace) {
        if (flag) {
            replace[newName].forEach(oldName => {
                if (~str.indexOf(oldName)) {
                    str = str.replace(oldName, newName);
                    arr[1] = newName;
                    flag = false;
                }
            });
        }
    }

    if( ~str.indexOf("»") && !(~str.indexOf("«")) ){
        str = str.replace("»",'');
    }
    if(  (str.split("«").length) > (str.split("»").length) ){
        str = str.replace("«",'');
    }

    for(var ex in exclusion){
        str = str.replace(ex, exclusion[ex]);
    }

    for(var ignoreName in ignore){
        ignore[ignoreName].forEach(name => {
            if(~str.indexOf(name)) {
                arr[1] = ignoreName;
            }
        });
    }
    str = str.replace(/№ /g,'№');
    arr[0] = str;

    return arr;
};

/**
 * Checks names
 * @param {string} item
 * @returns {boolean}
 */
var notIgnor = item => {
    var res = true;
    for(ignorName in ignore){
        if( item == ignorName ){
            res = false;
        }
    }
    return res;
};

var getArray = (row, index) => {
    return row[index] ?
        row[index]
            .split(';')
            .map(item => item.trim()) :
        [];
};

var getEducationInterval = (opt_programms) => {
    var programms = opt_programms || '',
        res = {
            begin: -1,
            end: -1
        },
        types = [
            {
                regExp: /дошкольное образование/i,
                begin: 0,
                end: 0
            }, {
                regExp: /начальное общее образование/i,
                begin: 1,
                end: 4
            }, {
                regExp: /основное общее образование/i,
                begin: 5,
                end: 9
            }, {
                regExp: /среднее общее образование/i,
                begin: 10,
                end: 11
            }
        ];

    types.forEach(item => {
        if (programms.search(item.regExp) >= 0) {
            if (res.begin == -1) {
                res.begin = item.begin;
            }
            res.end = item.end;
        }
    });

	var result = null;
    if (!(res.begin == -1 && res.end == -1)) {
        result = [];
        for (i = res.begin; i<=res.end; i++)
            result.push(i);
	}
    return result;
};

/**
 * parses row
 * @param {String} row
 * @returns {Object}
 */
var rowParse = row => {
    var school = rowToSchool(row);
    var giaResult = rowToGIA(row);
    var olimpResult = rowToOlimp(row);
    return {
        school: school,
        giaResult: giaResult,
        olimpResult: olimpResult
    };
};

/**
 * parses row to school object
 * @return {Object}
 * */
var rowToSchool = row => {
    var nParse = nameParse(row[NAME_INDEX]);
    var schoolName = getName(nParse);
    var schoolType = getType(nParse);

    return {
        name: schoolName.trim(),
		fullName: row[FULL_NAME_INDEX].trim(),
        abbreviation: row[NAME_INDEX],
        schoolType: schoolType,
        director: row[DIRECTOR_INDEX],
        phones: getPhones(row),
        site: row[SITE_INDEX],
        addresses: getArray(row, ADDRESSES_INDEX)
            .map(address=>{return {name: address, coords: []}; }),
        govermentKey: row[GOVERMENT_KEY_INDEX],
        educationInterval: getEducationInterval(row[EDU_PROGRAMM_INDEX])
    };
};


/**
 * Get school phones
 * @param {string[]} row School data row
 * @return {string[]}
 */
var getPhones = function(row) {
    var res =  getArray(row, PHONES_INDEX);
    if (res[0] && res[0].match(/\(000\)/)) {
        res = [];
    }

    res = lodash.uniq(res);

    return res;
};


/**
 * parses row to olimp object
 * @return {Array<Object>}
 * */
var rowToOlimp = (row) => {
    var rType = row[OLIMP_TYPE_INDEX],
        rStage = row[OLIMP_STAGE_INDEX] || '',
        rClass = row[OLIMP_CLASS_INDEX] || '',
        rSubject = row[OLIMP_SUBJECT_INDEX] || '',
        rStatus = row[OLIMP_STATUS_INDEX] || '',
        rYear = row[OLIMP_YEAR_INDEX] || '',
        results = [];

    if (rType) {
        var types = rType
                .replace(/[\r\n]/g, '')
                .split(';'),
            stages =  rStage
                .toString()
                .replace(/[\r\n]/g, '')
                .split(';'),
            classes = rClass
                .toString()
                .replace(/[\r\n]/g, '')
                .split(';'),
            subjects = rSubject
                .replace(/[\r\n]/g, '')
                .split(';'),
            statuses = rStatus
                .replace(/[\r\n]/g, '')
                .split(';'),
            years = rYear
                .toString()
                .replace(/[\r\n]/g, '')
                .split(';');

        types.forEach((type, index) => {
            results.push({
                type: types[index],
                stage: stages[index],
                class: classes[index],
                subject: subjects[index],
                status: statuses[index],
                year: years[index]

            });
        });
    }

    return results;
};

/**
 * parse row to GIA results
 * @return {Array.<Object>}
 * */
var rowToGIA = (row) => {
    var rowGiaCount = row[GIA_COUNT_INDEX] || '',
        rowGiaResult = row[GIA_RESULTS_INDEX] || '',
        rowSubjects = row[SUBJECT_INDEX] || '',
        counts = rowGiaCount
                .split(';\r\r\n')
                .filter(item => item)
                .map(item => parseFloat(item)),
        results = rowGiaResult
                .replace(/,/g, '.')
                .split(';\r\r\n')
                .filter(item => item)
                .map(item => parseFloat(item)),
        subjects = rowSubjects
                .split(';\r\r\n')
                .filter(item => item);

    /** remove duplicate values */
    for (var i = 0; i < subjects.length - 1; i++) {
        for (var j = i + 1, allres; j < subjects.length; j++) {
            if (subjects[i] == subjects[j]) {
                allres = results[i] * counts[i] + results[j] * counts[j];
                counts[i] += counts[j];
                results[i] = allres / counts[i];

                counts.splice(j, 1);
                results.splice(j, 1);
                subjects.splice(j, 1);
            }
        }
    }

    return counts.map((count, index) => {
        return {
            count: count,
            result: results[index],
            subject: subjects[index]
        };
    });
};


/**
 * creates or updates school
 * */
var parseSchool = async((schoolData) => {
    var school = await(services.school.getForParse(
             schoolData.govermentKey));

    console.log('Parse school: ' + schoolData.name);

    return school ?
        await (services.school.update(school.id, schoolData)) :
        await (services.school.create(schoolData));
});

var initGiaResults = async (function (giaResults, schoolId) {
    giaResults.forEach(gia => {
        var subject = await (services.subject.get({
            name: gia.subject
        }, {
            count: 'one',
            createIfNotExists: true
        }));

        services.studyResult.createGia({
            count: gia.count,
            result: gia.result,
            school_id: schoolId,
            subject_id: subject.id
        },{
            updateIfExists: true
        })
    });
});

/**
 * Settings for accessing this script using cli
 */
commander
    .command('parse <path>')
    .description('Parses an .xlsx file from a given path')
    .action(file => parse(file));

exports.Command;

