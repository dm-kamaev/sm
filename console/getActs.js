var commander = require('commander');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var http = require('http');
var services = require.main.require('./app/components/services').all;
const fs = require('fs');
var mkdirp = require("mkdirp");

const HOST = 'api.data.mos.ru';
const REPORT_PATH = './console/reports/';
const MODULES = './console/modules/activities/';

var insertActs = async(function() {
    await(services.school.deleteActivities());
    console.time("Matching");

    mkdirp(REPORT_PATH, function(err) {
        if (err) {
            return;
        }
    });

    var schools = await(services.school.listInstances()),
        foundSchools = {},
        ourNotFoundSchools = [],
        activities = await(openActivitiesFile('activities.json')),
        parsedSchools = createParsedSchools(schools),
        parsedActivities = createParsedActivities(activities);

    foundSchools = await(fillActsDB(parsedSchools, parsedActivities));

    console.log('Total schools: ' + schools.length);
    console.log('Total act\'s: ' + activities.length);
    console.log('Our schools matched: ' + Object.keys(foundSchools).length);

    ourNotFoundSchools = notFoundSchools(schools, foundSchools);
    fs.writeFileSync(REPORT_PATH + 'notFoundOurSchools.json', JSON.stringify(ourNotFoundSchools));
    console.log('Schools\' count haven\'t been found: ' + ourNotFoundSchools.length);

    console.timeEnd("Matching");
});

var openActivitiesFile = function(fileName) {
    var acts,
        filePath = REPORT_PATH + fileName;
    try {
        fs.statSync(filePath).isFile();
        console.log('Loading activities from ' + filePath);
        acts = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch(err) {
        console.log(filePath + ' not found, downloading activities...');
        acts = downloadActivities(fileName);
    } finally {
        return acts;
    }
};

var createParsedSchools = function(schools) {
    var parsedSchools = [];
    for (var i = 0, schoolsLength = schools.length; i < schoolsLength; i++) {
        var parsedSchoolNumber = schools[i].fullName
            .slice(schools[i].fullName.lastIndexOf('№ ') + 2)
            .match(/\d+/g),
            schoolNumber = parsedSchoolNumber ? parsedSchoolNumber[0] : NaN,
            parsedSchoolName = schools[i].fullName.match(/(?!.*[«]).+(?=[»])/g),
            schoolName = parsedSchoolName ? parsedSchoolName[0].toLowerCase() : null;
        parsedSchools.push({
            'number': schoolNumber,
            'name': schoolName,
            'id': schools[i].id,
            'fullName': schools[i].fullName
        });
    }
    return parsedSchools;
};

var createParsedActivities = function(activities) {
    var parsedActivities = [],
        activity;

    for (var i = 0, actLength = activities.length; i < actLength; i++) {
        activity = activities[i] ? activities[i].Cells : null;
        if (activity) {
            var activityNumber = activity.nomer.trim(),
                parsedActivityName = activity.poln_name.match(/"(.*?)"/),
                activityName = parsedActivityName ?
                    parsedActivityName[0].slice(1, -1).toLowerCase() : null;

            parsedActivities.push({
                'number': activityNumber,
                'name': activityName,
                'groupLength': activity.name_grupp.length,
                'info': activity
            });
        }
    }

    return parsedActivities;
};

var fillActsDB = function(schools, activities) {
    var ourSchools = {},
        extraMatches = getExtraMatches('extraMatches.json'),
        activity;
    for (var i = 0, actsLength = activities.length; i < actsLength; i++) {
        activity = activities[i];
        var ourSetSchools = {};
        if (!isStrangeActivity(activity)) {
            ourSetSchools = findActivityMatches(schools, activities[i], extraMatches);
        }
    ourSchools = mergeObjects(ourSchools, ourSetSchools);
        console.log('Act\'s processing: ' + i);
        console.log('Our schools found: ' + Object.keys(ourSchools).length);
    }
    return ourSchools;
};

var isStrangeActivity = function(activity) {
    return activity.groupLength > 255 ||
        activity.info.name_grupp.match(/\\t/) ||
        activity.info.profil.match(/другое/i) ||
        activity.info.tipe_zanyat.match(/другое/i);
};

var notFoundSchools = function(allSchools, findedSchools) {
    var missingSchools = [];
    allSchools.forEach(function(school) {
        var isFound = false;
        for (var id in findedSchools) {
            if (school.fullName === findedSchools[id]) {
                isFound = true;
                break;
            }
        }
        if (!isFound) {
            missingSchools.push({
                id: school.id,
                name: school.name,
                fullName: school.fullName
            });
        }
    });
    return missingSchools;
};

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
            resolve([]);
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

var getActivitiesSet = function(params) {
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

var findActivityMatches = function(schools, activity, extraMatches) {
    var ourSchools = {},
        extraMatch = {};
    for (var i = 0, schoolsLength = schools.length; i < schoolsLength; i++) {
        if (findMatch(schools[i], activity)) {
            addActivity(activity, schools[i]);
            ourSchools[schools[i].id] = schools[i].fullName;
            break;
        }
    }
    extraMatch = findExtraMatch(extraMatches, activity);
    if (extraMatch.hasOwnProperty('id')) {
        addActivity(activity, extraMatch);
        ourSchools[extraMatch.id] = extraMatch.fullName;
    }
    return ourSchools;
};

var findExtraMatch = function(extraMatches, activity) {
    var school = {};
    extraMatches.forEach(function(extraMatch) {
        if (activity.info.kratk_name === extraMatch.kratk_name) {
            school = extraMatch.school;
        }
    });
    return school;
};

var getExtraMatches = function(fileName) {
    var extraActs = [];
    try {
        fs.statSync(MODULES + fileName).isFile();
        console.log('Loading extra matches from ' + MODULES + fileName);
        extraActs = JSON.parse(fs.readFileSync(MODULES + fileName, 'utf8'));
    } catch(err) {
        console.log(MODULES + fileName + ' not found');
    } finally {
        return extraActs;
    }
};

var mergeObjects = function (obj1,obj2) {
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
};

var findMatch = function(school, activity) {
    var actSchoolNum = activity.number,
        actSchoolName = activity.name;
    if (school.number === actSchoolNum) {
        return true;
    } else if (isNaN(school.number) &&
            typeof school.name === 'string' &&
            school.name === actSchoolName) {
        return true;
    } else {
        return false;
    }
};

var addActivity = function(activity, school) {
    services.school.createActivity(
    {
        schoolId: school.id,
        direction: activity.info.napravlen,
        profile: activity.info.profil,
        type: activity.info.tipe_zanyat,
        name: activity.info.name_grupp
    });
};

var getAllActivities = async(function() {
    var actCount = await(countActs()),
        activities = [];
    for(var top = 250, skip = 0; skip <= actCount; skip += 250) {
        console.log('Current set: ' + skip);
        var actsSet = await(getActivitiesSet({
            top: top,
            skip: skip
        }));
        await(activitiesCorrection(actsSet, skip));
        activities = activities.concat(actsSet);
    }
    return activities;
});

var activitiesCorrection = async(function(activities, skip) {
    activities.forEach((activity, index) => {
        var newActivities;
        var i;
        for (i = 0; i < 5 && isActivityBroken(activity); i++) {
            newActivities = await(getActivitiesSet({
                top: 1,
                skip: skip + index
            }));
            activity = newActivities[0];
        }

        if (i == 5) {
            delete activities[index];
        }
        else {
            activities[index] = activity;
        }
    });
});

var isActivityBroken = function(activity) {
    var res = false;

    if (activity) {
        var data = activity.Cells;

        res = data.profil.match('�') ||
            data.napravlen.match('�') ||
            data.tipe_zanyat.match('�') ||
            data.name_grupp.match('�');
    }

    return res;
};

var downloadActivities = async(function(fileName) {
    var acts = await(getAllActivities());
    fs.writeFileSync(REPORT_PATH + fileName, JSON.stringify(acts));
    return acts;
});

commander
    .command('getActs')
    .description('Load activities from data.mos.ru')
    .action(() => insertActs());

exports.Command;
