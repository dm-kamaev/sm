var commander = require('commander');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var http = require('http');
var services = require.main.require('./app/components/services').all;
const fs = require('fs');

const host = 'api.data.mos.ru';

var request = function(options) {
    var request = new Promise( function(resolve) {
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
        host: host,
        path: '/v1/datasets/746/count',
        method: 'GET'
    };
    return request(options);
};

var getActs = function(params) {
    var path = '/v1/datasets/746/rows?';
    for (var prop in params) {
        path += '$' + prop + '=' + params[prop] + '&';
    }
    var options = {
        host: host,
        path: path,
        method: 'GET'
    };
    return request(options);
};

var ourSchools = []; // test
var foundActCount = 0;
var notFoundActCount = 0;
var theirSchools = [];

var findMatches = function(schools, activities) {
    activities.forEach(function(activity) {
        var isFound = false,
            activityNumber = activity.Cells.nomer.trim();
        if (activity.Cells.name_grupp.length <= 255 && activityNumber > 0) {
            schools.forEach(function(school) {
                var schoolNumber = school.fullName
                    .slice(school.fullName.lastIndexOf('№ ') + 2).match(/\d+/g) || NaN;
                if (schoolNumber[0] === activityNumber) {
                    //addActivity(activity, school);
                    ourSchools.push(school.fullName); // test
                    isFound = true;
                }
            });
        }
        if (isFound) {
            foundActCount++;
        } else {
            notFoundActCount++;
            theirSchools.push(activity.Cells.poln_name);
        }
    });
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
   var u = {}, a = [];
   for(var i = 0, l = array.length; i < l; ++i){
      if(u.hasOwnProperty(array[i])) {
         continue;
      }
      a.push(array[i]);
      u[array[i]] = 1;
   }
   return a;
};

var start = async(function() {
    var schools = await(services.school.list()),
        params = {
            top: 250,
            skip: 0
        },
        actCount = await(countActs());
    for(; params.skip <= actCount; params.skip += 250) {
        var activities = await(getActs(params));
        findMatches(schools, activities);
        ourSchools = getUnique(ourSchools); // test
        theirSchools = getUnique(theirSchools);
        console.log('Our schools matched: ' + ourSchools.length); // test
        console.log('Found act\'s: ' + foundActCount);
        console.log('Not found act\'s: ' + notFoundActCount);
        var totalActs = foundActCount + notFoundActCount;
        console.log('Total № of act\'s: ' + totalActs);
        console.log('Number of act\'s in set: ' + activities.length);
        console.log('Number of not found schools: ' + theirSchools.length);
    }
    fs.writeFileSync('./console/notFindSchools.json', theirSchools);

    var ourNotFoundSchools = [];

    schools.forEach(function(school) {
        var flag = false;
        ourSchools.forEach(function(ourSchool) {
            if (school.fullName === ourSchool) {
                flag = true;
            }
        });
        if (!flag) {
            ourNotFoundSchools.push(school);
        }
    });
    fs.writeFileSync('./console/notFindOurSchools.json', JSON.stringify(ourNotFoundSchools));
    console.log('Our not: ' + ourNotFoundSchools.length);
});

commander
    .command('getActs')
    .description('Load activities from data.mos.ru')
    .action(() => start());

exports.Command;
