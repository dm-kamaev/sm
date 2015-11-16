/**
 * Для получения токена следует перейти по
 * https://oauth.vk.com/authorize?client_id=5063331&display=page&redirect_uri=http://mel.fm&response_type=token&v=5.37
 * и скопировать токен из адресной строки в файл token.json
 *
 */
var schoolServices = require.main.require('./api/modules/school/services').schoolServices;
var commander = require('commander');
var https = require('https');
var colors = require('colors');
var sleep = require('sleep');
var fs = require('fs');


var async = require('asyncawait/async');
var await = require('asyncawait/await');

const ACCESSS_TOKEN = require('./token.json').value;

var getSchools = async ((cityId) => {
    cityId = cityId ? cityId : 1;
    return await (request('database.getSchools',{
        city_id: cityId,
        count: 5000
    }));
});


var getUserfulUsers = (users=>{
    console.log(colors.yellow('users found: '+users.length));
    var results = [];
    users.forEach(user => {
        if (user.university)
            results.push(user);
    });
    //console.log(colors.yellow('usefull: '+results.length));
    return results;
});



var getSchoolUsers = async ((school) => {
    var schoolId = school.id;

    console.log('Getting users for school ' + colors.yellow(school.id) +
    ' || ' + colors.yellow(school.title));
    var results = [];
    var params = {
        fields:'education',
        school: schoolId,
        count: 1000
    };
    for (var i = 2013; i <= 2015; i++) {
        var yearParams = params;
        yearParams.school_year = i;
        var reqTry = 0,
    		answ;
        do {
            answ = await(request('users.search', yearParams));
            if (reqTry)
                console.log(colors.red(reqTry+1) + ' try for school '
                    + school.title + ' year ' + colors.red(i));
            reqTry++;
        } while (!answ && reqTry<3);
        if (answ) {
            if (answ.response.count > 1000) {
                console.log('There are too many results in school ' + colors.red(school.title)
                    + ' year ' + colors.red(i));
            }
            else {
                results.push({
                    year:i,
                    results: answ.response.items
                });
            }
        }
    }
    return results;
});



var request = async ((methodName, params) => {
    var paramsString = '';
    for (var prop in params){
        paramsString += (prop + '=' + params[prop] + '&');
    }
    var apiString = '/method/' + methodName + '?' + paramsString
        + 'v=5.8&access_token=' + ACCESSS_TOKEN;

    var options = {
        host: 'api.vk.com',
        path: apiString,
        method: 'GET',
    };
    sleep.usleep(500000);
    var doRequest = new Promise( function(resolve, reject) {
      	var rqq = https.request(options);
        rqq.on('response', function (response) {
            var data = '';
            response.on('data', function (chunk) {

                data += chunk;
            });
            response.on('end', function () {
                if (params.school)
                    console.log('got an answer for school ' +
                        colors.green(params.school) + ' year ' +
                        colors.green(params.school_year));

                resolve(JSON.parse(data));
                //sleep.usleep(210000);
            });
        }).end();
        rqq.on('error', function(e) {
            console.log('problem with request: ' + e.message);
            resolve(null);
        });
    });

    var res;
    do {
        res = await(doRequest);
        if (res && res.error) {
            console.log(colors.red('ERROR: ' + res.error.error_msg));
            console.log(colors.yellow('Params:'));
            console.log(colors.yellow(JSON.stringify(params)));
            sleep.sleep(10);
        }
    } while (res && res.error && res.error.error_code == 6);
    if (!res){
        console.log(colors.red('Didnt get any response'));
        return null;
    }
    if (!res.response || res.response.count === 0){
        sleep.sleep(1);
        return null;
        //throw new Error('');
    }
    return res;

});

var textSubstrings = (string1, string2) => {
    var str1 = string1.replace( /^\d+/g, ''),
        str2 = string2.replace( /^\d+/g, '');
    if (str1.indexOf(str2) != -1 ||
        str2.indexOf(str1) != -1)
        return true;
    return false;
};

var compareNumbers = (string1, string2) => {
    var numArr1 = string1.match(/\d+/g) || [],
        numArr2 = string2.match(/\d+/g) || [],
	isFound = false;
//    console.log(numArr1 + ' ' + numArr2);
    numArr1.forEach(num1 => {
	    numArr2.forEach(num2 => {
		    if (num1 && num1 == num2){
		    	isFound = true;
		    }
	    });
    }); 
    return isFound;
};

var getMatches = (vkSchools, ourSchools) => {
    var results = [],
        extraResults = [],
        notFound = [];
    for (var i = 0; i<ourSchools.length; i++ ){
        var firstSchool = ourSchools[i].name.toLowerCase();
        var preciseMatch = vkSchools.find(vks => {
            var secondSchool = vks.title.toLowerCase();
            if (firstSchool == secondSchool)
                return true;
        });
        if (preciseMatch)
            results.push(preciseMatch);
        else {
            var roughMatches = vkSchools.filter(el => {
                var secondSchool = el.title.toLowerCase();
                return compareNumbers(firstSchool, secondSchool);
            });
            if (roughMatches.length > 0)
                extraResults.push({
                    ourSchool: {
                        our_id: ourSchools[i].id,
                        name: ourSchools[i].name
                    },
                    vkMatches: roughMatches
                });
            else
                notFound.push({
                    our_id: ourSchools[i].id,
                    name: ourSchools[i].name
                });
        }
    }
    saveToJson(extraResults, 'extra.json');
    saveToJson(notFound, 'notFound.json');
    saveToJson(results, 'matches.json');
    console.log('Количество точных результатов:' + results.length);
    console.log('Количество примерных результатов:' + extraResults.length);
    console.log('Количество не найденых результатов:' + notFound.length);
    return results;
};

function fileExists(filePath)
{
    try
    {
        return fs.statSync(filePath).isFile();
    }
    catch (err)
    {
        return false;
    }
}

var saveToJson = (schools, name) => { //'vk_schools.json'
    var js = JSON.stringify(schools);
    fs.writeFileSync(name,js);
};

var loadFromJson = (name) => { //'vk_schools.json'

    if (!fileExists(name)) {
        console.log('File ' + colors.yellow(name)
            + ' is not found and will be created now');
        fs.writeFileSync(name, '[]');
    }
    return require('../' + name);
};



var start = async(() => {
    var schools = await(getSchools());
    var ourSchools = await(schoolServices.list());
    console.log('Школ вконтакте: ' + colors.yellow(schools.response.items.length));
    console.log('Наших школ: ' + colors.yellow(ourSchools.length));
    var matches = getMatches(schools.response.items, ourSchools);
    //proces
    console.log(('================================').yellow);
    console.log('Количество совпадений: ' + colors.yellow(matches.length));
    process.exit();
    console.log(('================================').yellow);
    console.log('Getting universities for schools. Patience');
    var processed_matches = [];
    var cached_matches = loadFromJson('pr_matches.json');

    matches.forEach(match =>{
        var cached_match = cached_matches.find(school =>{
            if (school.id == match.id)
                return true;
        });
        if (cached_match){
            console.log('Users for school '
                + colors.green(cached_match.title) + ' already cached');
            processed_matches.push(cached_match);
        } else {
            var local_match = match;
            var resultsArr = [];
            var users = await(getSchoolUsers(local_match));
            if (users || users.length != 0){
                users.forEach(userYear => {
                    var yearResults = {
                        year: userYear.year,
                        graduates: []
                    };
                    var uniCountForYear = 0;
                    userYear.results.forEach(user => {
                        var uni = user.university_name;
                        if (uni) {
                            uniCountForYear++;
                            var uniInArray = yearResults.graduates.find(univ => {
                                if (univ.name == uni)
                                    return true;
                            });
                            if (uniInArray)
                                uniInArray.count++;
                            else
                                yearResults.graduates.push({
                                    name: uni,
                                    count: 1
                                });
                        }
                    });
                    yearResults.total = uniCountForYear;
                    resultsArr.push(yearResults);
                });
                local_match.universities = resultsArr;
                processed_matches.push(local_match);
            } else {
                console.log('Got nothing for ' + colors.red(match.title));
            }
        }
        saveToJson(processed_matches, 'pr_matches.json');
    });
});

commander
    .command('vkapi')
    .description('Parses an .xlsx file from a given path')
    .action(() => start());

exports.Command;
