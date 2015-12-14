var commander = require('commander');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var http = require('http');
var services = require.main.require('./app/components/services').all;
const fs = require('fs');
var mkdirp = require("mkdirp");

const HOST = 'api.data.mos.ru';
const REPORT_PATH = './console/reports/';

var request = function(options) {
    var request = new Promise(function(resolve) {
        var rqq = http.request(options);
        rqq.on('response', function (response) {
            var data = '';
            response.on('data', function (chunk) {
                data += chunk;
            });
            response.on('end', function () {
                resolve(JSON.parse(data));
            });
        }).end();
        rqq.on('error', function(e) {
            console.log('problem with request: ' + e.message);
            resolve(null);
        });
    });
    return request;
};

var countActs = function() {
    var options = {
        host: HOST,
        path: '/v1/datasets/746/count',
        method: 'GET'
    };
    return request(options);
};

var getActivities = function(params) {
    var path = '/v1/datasets/746/rows?';
    for (var prop in params) {
        path += '$' + prop + '=' + params[prop] + '&';
    }
    var options = {
        host: HOST,
        path: path,
        method: 'GET'
    };
    return request(options);
};

var ourSchools = {}; // test
var nameSchools = {}; // test

var fillActsDB = function(schools, activities) {
    var foundCount = 0;
    for (var i = 0, actsLength = activities.length; i < actsLength; i++) {

        var activityNumber = activities[i].Cells.nomer.trim(),
            parsedActivityName = activities[i].Cells.poln_name.match(/"(.*?)"/),
            activityName = parsedActivityName ?
                parsedActivityName[0].slice(1, -1).toLowerCase() :
                null;

        if (activities[i].Cells.name_grupp.length <= 255) {
            for (var j = 0, schoolsLength = schools.length; j < schoolsLength; j++) {
                // var parsedSchoolNumber = schools[j].fullName
                //     .slice(schools[j].fullName.lastIndexOf('№ ') + 2)
                //     .match(/\d+/g),
                //     schoolNumber = parsedSchoolNumber ? parsedSchoolNumber[0] : NaN,
                //     parsedSchoolName = schools[j].fullName.match(/(?!.*[«]).+(?=[»])/g),
                //     schoolName = parsedSchoolName ? parsedSchoolName[0].toLowerCase() : null;
                //
                // if (schoolNumber === activityNumber) {
                //     //addActivity(activity, school);
                //     ourSchools.push(schools[j].fullName); // test
                //     isFound = true;
                // } else if (activityNumber === '0' && typeof schoolName === 'string' && schoolName === activityName) {
                //     //addActivity(activity, school);
                //     nameSchools.push(schools[j].fullName);
                //     ourSchools.push(schools[j].fullName);
                //     isFound = true;
                // }
                if (findMatch(schools[j], activityNumber, activityName)) {
                    // addActivity(activities[i], schools[j]);
                    foundCount++;
                    break;
                }
            }
        }
    }
    return foundCount;
};

var findMatch = function(school, actSchoolNum, actSchoolName) {
    var parsedSchoolNumber = school.fullName
        .slice(school.fullName.lastIndexOf('№ ') + 2)
        .match(/\d+/g),
        schoolNumber = parsedSchoolNumber ? parsedSchoolNumber[0] : NaN,
        parsedSchoolName = school.fullName.match(/(?!.*[«]).+(?=[»])/g),
        schoolName = parsedSchoolName ? parsedSchoolName[0].toLowerCase() : null;

    if (schoolNumber === actSchoolNum) {
        //ourSchools.push(school.fullName); // test
        ourSchools[school.id] = school.fullName;
        return true;
    } else if (actSchoolNum === '0' && typeof schoolName === 'string' && schoolName === actSchoolName) {
        // nameSchools.push(school.fullName);
        nameSchools[school.id] = school.fullName;
        //ourSchools.push(school.fullName);
        ourSchools[school.id] = school.fullName;
        return true;
    } else {
        return false;
    }
};

var addActivity = function(activity, school) {
    services.school.createActivity(
    {
        schoolId: school.id,
        direction: activity.Cells.napravlen,
        profile: activity.Cells.profil,
        type: activity.Cells.tipe_zanyat,
        name: activity.Cells.name_grupp
    });
};

var getUnique = function(array) {
    var u = {},
        a = [];
    for(var i = 0, l = array.length; i < l; ++i) {
        if(u.hasOwnProperty(array[i])) {
            continue;
        }
        a.push(array[i]);
        u[array[i]] = 1;
    }
    return a;
};

var notFoundSchools = function(allSchools, findedSchools) {
    var missingSchools = [];
    allSchools.forEach(function(school) {
        for (var id in findedSchools) {
            if (findedSchools.hasOwnProperty[id]) {
                if (school.fullName !== findedSchools[id]) {
                    missingSchools.push({
                        id: school.id,
                        name: school.name,
                        fullName: school.fullName
                    });
                }
            }
        }
    });
    return missingSchools;
};

var getAllActivities = async(function() {
    var actCount = await(countActs()),
        activities = [];
    for(var top = 250, skip = 0; skip <= actCount; skip += 250) {
        var actsSet = await(getActivities({
            top: top,
            skip: skip
        }));
        activities = activities.concat(actsSet);
    }
    return activities;
});

var start = async(function() {
    var schools = await(services.school.listInstances()),
        actCount = await(countActs()),
        foundActsCount = 0,
        ourNotFoundSchools = [],
        activities = [];

    for(var top = 250, skip = 0; skip <= actCount; skip += 250) {
        var activities = await(getActivities({
            top: top,
            skip: skip
        }));
        foundActsCount += fillActsDB(schools, activities);
        //ourSchools = getUnique(ourSchools); // test
        //nameSchools = getUnique(nameSchools);
        console.log('Set of data: ' + skip);
        console.log('Our schools matched: ' + Object.keys(ourSchools).length); // test
        console.log('Found act\'s: ' + foundActsCount);
        console.log(nameSchools);
    }

    ourNotFoundSchools = notFoundSchools(schools, ourSchools);
    // schools.forEach(function(school) {
    //     for (var id in ourSchools) {
    //         if (ourSchools.hasOwnProperty[id]) {
    //             if (school.fullName !== ourSchools[id]) {
    //                 ourNotFoundSchools.push({
    //                     id: school.id,
    //                     name: school.name,
    //                     fullName: school.fullName
    //                 });
    //             }
    //         }
    //     }
    //     // ourSchools.forEach(function(ourSchool) {
    //     //     if (school.fullName === ourSchool) {
    //     //         flag = true;
    //     //     }
    //     // });
    //     // if (!flag) {
    //     //     ourNotFoundSchools.push({
    //     //         id: school.id,
    //     //         name: school.name,
    //     //         fullName: school.fullName
    //     //     });
    //     // }
    // });
    mkdirp(REPORT_PATH, function(err) {
        if (err) {
            return;
        }
        fs.writeFileSync(REPORT_PATH + 'notFindOurSchools.json', JSON.stringify(ourNotFoundSchools));
    });
    console.log('Schools\' count haven\'t been found: ' + ourNotFoundSchools.length);
    //console.log(nameSchools);
});

commander
    .command('getActs')
    .description('Load activities from data.mos.ru')
    .action(() => start());

exports.Command;
