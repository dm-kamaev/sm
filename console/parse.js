var commander = require('commander');
var xlsx = require('node-xlsx');

var modules = require.main.require('./api/modules');

var async = require('asyncawait/async');
var await = require('asyncawait/await');

var NAME_INDEX = 6,
    DIRECTOR_INDEX = 13,
    PHONES_INDEX = 15,
    SITE_INDEX = 17,
    ADDRESSES_INDEX = 20,
    SUBJECT_INDEX = 37,
    GIA_COUNT_INDEX =38,
    GIA_RESULTS_INDEX = 39;

var allSubjects = {},
    subCount=1;


var getArray = (row, index) => {
    return row[index] ?
        row[index]
            .split(';')
            .map(item => item.trim()) :
        [];
};

var rowParse = (row, index) => {
    return {
        school: rowToSchool(row),
        giaResults: rowToGIA(row, index)
    }
};

var getSubjectIds = (row) => {
    var subjects = row[SUBJECT_INDEX]? row[SUBJECT_INDEX].split(';\r\r\n') : [];
    var id = [];

    if(subjects[0] == 'Результаты ГИА / Предмет') {
        return 0;
    }

    subjects.forEach(subject => {
        if(!allSubjects[subject]) {
            allSubjects[subject] = subCount;
            id.push(subCount);
            subCount++;
        } else {
            id.push(allSubjects[subject]);
        }
    });

    return id;
};

var rowToSchool = row => {
    return {
        name: row[NAME_INDEX],
        director: row[DIRECTOR_INDEX],
        phones: getArray(row, PHONES_INDEX),
        site: row[SITE_INDEX],
        addresses: getArray(row, ADDRESSES_INDEX),
        coords: []
    };
};

var rowToGIA = (row, schoolIndex) => {
    var rowGiaCount = row[GIA_COUNT_INDEX]?
            row[GIA_COUNT_INDEX] : "",
        rowGiaResult = row[GIA_RESULTS_INDEX]?
            row[GIA_RESULTS_INDEX].replace(/,/g,'.') : "",
        count = rowGiaCount.split(';\r\r\n'),
        result = rowGiaResult.split(';\r\r\n'),
        subjectIds = getSubjectIds(row),
        giaRes = [];

    /** parse all strings to float */
    var pf = item => {return parseFloat(item)};

    for(var i = 0; i < count.length; i++) {
        count[i] = pf(count[i]);
        result[i] = pf(result[i]);
    }

    /** remove duplicate values */
    for(var i = 0; i < subjectIds.length-1; i++)
        for(var j = i+1, allres; j < subjectIds.length; j++) {
            if(subjectIds[i] == subjectIds[j]) {
                allres = result[i]*count[i]+result[j]*count[j];
                count[i] += count[j];
                result[i] = allres / count[i];

                count.splice(j, 1);
                result.splice(j, 1);
                subjectIds.splice(j, 1);
            }
        }

    /** create return */
    for (var i = 0; i < count.length; i++) {
        giaRes.push({
            count: count[i],
            result: result[i],
            school_id: schoolIndex,
            subject_id: subjectIds[i]
        });
    }

    return giaRes;
};

var parse = async(path => {
    var parsed = xlsx.parse(path),
        data = parsed[0].data;

    await(modules.school.models.GiaResults.sync({force: true}))
    await(modules.school.models.School.sync({force: true}))
    await(modules.school.models.Subject.sync({force: true}))

    data.map(rowParse)
        .filter((item, index) => index < 2 && index)
        .forEach(item => {
            modules.school.models.School.create(item.school);
            item.giaResults.forEach(item => modules.school.models.GiaResults.create(item));
        });

    for(var subject in allSubjects) {
        if(subject) {
            modules.school.models.Subject.create({name: subject});
        }
    }
});


// Settings for accessing this script using cli
commander
    .command('parse <path>')
    .description('Parses an .xlsx file from a given path')
    .action(file => parse(file));
exports.Command;
