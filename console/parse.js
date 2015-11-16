var async = require('asyncawait/async');
var await = require('asyncawait/await');
var commander = require('commander');
var xlsx = require('node-xlsx');
var colors = require('colors');


var modules = require.main.require('./api/modules');
var services =
    require.main.require('./api/modules/school/services');

var replace = require('./parseConfig').replace;
var ignore = require('./parseConfig').ignore;
var exclusion = require('./parseConfig').exclusion;

var GOVERMENT_KEY_INDEX = 2,
    NAME_INDEX = 6,
    DIRECTOR_INDEX = 13,
    PHONES_INDEX = 15,
    SITE_INDEX = 17,
    ADDRESSES_INDEX = 20,
    EDU_PROGRAMM_INDEX = 21,
    SUBJECT_INDEX = 37,
    GIA_COUNT_INDEX =38,
    GIA_RESULTS_INDEX = 39;

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

    return [res.begin, res.end];
};

/**
 * parses row
 * @param {String} row
 * @returns {Object}
 */
var rowParse = row => {
    var school = rowToSchool(row);
    var giaResult = rowToGIA(row);

    return {
        school: school,
        giaResult: giaResult
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
        name: schoolName,
        schoolType: schoolType,
        director: row[DIRECTOR_INDEX],
        phones: getArray(row, PHONES_INDEX),
        site: row[SITE_INDEX],
        addresses: getArray(row, ADDRESSES_INDEX),
        goverment_key: row[GOVERMENT_KEY_INDEX],
        educationInterval: getEducationInterval(row[EDU_PROGRAMM_INDEX]),
        coords: []
    };
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
    var params = {
        where: {
            goverment_key: schoolData.goverment_key
        }
    };

    var school = await( services.schoolServices.get(params, {count: 'one'}) );

    return school ?
        await (services.schoolServices.update(school, schoolData)) :
        await (services.schoolServices.create(schoolData));
});

var initGiaResults = async (function (giaResults, schoolId) {
    giaResults.forEach(gia => {
        var subject = await (services.subjectServices.get({
            name: gia.subject
        }, {
            count: 'one',
            createIfNotExists: true
        }));

        services.giaResultServices.create({
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
 * main parse method
 */
var parse = async(path => {

    var parsed = xlsx.parse(path),
        data = parsed[0].data;

    data.map(rowParse)
        .filter((item, index) =>
            (index > 0) &&
            notIgnor(item.school.schoolType))
        .forEach((item) => {
            var school = await(parseSchool(item.school));

            if(item.giaResult.length) {
                initGiaResults(item.giaResult, school.id)
            }
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
