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
    })
    //console.log(colors.yellow('usefull: '+results.length));
    return results;
});



var getSchoolUsers = async ((school) => {
    schoolId = school.id;

    console.log('Getting users for school ' + colors.yellow(school.id) +
    ' || ' + colors.yellow(school.title));
    var results = [];
    var params = {
        fields:'education',
        school: schoolId,
        count: 1000
    }
    for (var i = 2013; i <= 2015; i++) {
        var yearParams = params;
        yearParams.school_year = i;
        var reqTry = 0;
        do {
            var answ = await(request('users.search', yearParams));
            if (reqTry)
                console.log(colors.red(reqTry+1) + ' try for school '
                    + school.title + ' year ' + colors.red(i));
            reqTry++;
        } while (!answ && reqTry<3)
        if (answ) {
            if (answ.response.count > 1000) {
                console.log('There are too many results in school ' + colors.red(school.title)
                    + " year " + colors.red(i));
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
    for (prop in params){
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
        rqq = https.request(options);
        rqq.on('response', function (response) {
            var data = '';
            response.on("data", function (chunk) {

                data += chunk;
            });
            response.on('end', function () {
                if (params.school)
                    console.log("got an answer for school " +
                        colors.green(params.school) + ' year ' +
                        colors.green(params.school_year));

                resolve(JSON.parse(data));
                //sleep.usleep(210000);
            });
        }).end()
        rqq.on('error', function(e) {
            console.log('problem with request: ' + e.message);
            resolve(null);
        });
    });

    var res
    do {
        res = await(doRequest);
        if (res && res.error) {
            console.log(colors.red('ERROR: ' + res.error.error_msg));
            console.log(colors.yellow('Params:'));
            console.log(colors.yellow(JSON.stringify(params)));
            sleep.sleep(10);
        }
    } while (res && res.error && res.error.error_code == 6)
    if (!res){
        console.log(colors.red('Didnt get any response'));
        return null;
    }
    if (!res.response || res.response.count == 0){
        sleep.sleep(1);
        return null;;
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
}

var compareNumbers = (string1, string2) => {
    var num1 = string1.replace( /^\D+/g, ''),
        num2 = string2.replace( /^\D+/g, '');
    if (num1 && num1 == num2)
        return true;
    return false;
}

var getMatches = (vkSchools, ourSchools) => {
    var results = [],
        extraResults = [];
    for (var i = 0; i<ourSchools.length; i++ ){
        for (var j = 0; j<vkSchools.length; j++){


            var firstSchool = ourSchools[i].name.toLowerCase(),
                secondSchool = vkSchools[j].title.toLowerCase();
            if (firstSchool == secondSchool)
                results.push(vkSchools[j]);
            else {
                var outerMatch = results.find (res => {
                      if(res.id == vkSchools[j])
                        return true;
                    })

                if (!outerMatch &&
                    //textSubstrings(firstSchool, secondSchool) ||
                    compareNumbers(firstSchool, secondSchool)) {
                    var match = extraResults.find(res => {
                        if (res.ourSchool.our_id == ourSchools[i].id)
                            return true
                    })
                    if (match) {
                        var innerMatch = match.vkMatches.find(school => {
                            if (school.id == vkSchools[j].id)
                                return true;
                        })
                        if (!innerMatch)
                            match.vkMatches.push(vkSchools[j])
                    } else {
                        var newMatch = {
                            ourSchool: {
                                our_id: ourSchools[i].id,
                                name: ourSchools[i].name
                            },
                            vkMatches: []
                        };
                        newMatch.vkMatches.push(vkSchools[j]);
                        extraResults.push(newMatch)
                    }
                }
            }

        }
    }
    saveToJson(extraResults, "extra.json");
    return results;
}

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
}

var loadFromJson = (name) => { //'vk_schools.json'

    if (!fileExists(name)) {
        console.log('File ' + colors.yellow(name)
            + ' is not found and will be created now');
        fs.writeFileSync(name, '[]');
    }
    return require('../' + name);
}



var start = async(() => {
    var schools = await(getSchools());
    var ourSchools = await(schoolServices.list());
    console.log('Школ вконтакте: ' + colors.yellow(schools.response.items.length));
    console.log('Наших школ: ' + colors.yellow(ourSchools.length));
    var matches = getMatches(schools.response.items, ourSchools);
    saveToJson(matches, 'matches.json')
    //proces
    console.log(('================================').yellow);
    console.log('Количество совпадений: ' + colors.yellow(matches.length));
    saveToJson(matches, '1234.json');
    process.exit();
    console.log(('================================').yellow);
    console.log('Getting universities for schools. Patience');
    var processed_matches = [];
    var cached_matches = loadFromJson('pr_matches.json');

    matches.forEach(match =>{
        var cached_match = cached_matches.find(school =>{
            if (school.id == match.id)
                return true;
        })
        if (cached_match){
            console.log("Users for school "
                + colors.green(cached_match.title) + " already cached");
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
                        var uni = user.university_name
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
        saveToJson(processed_matches, 'pr_matches.json')
    });
})

commander
    .command('vkapi')
    .description('Parses an .xlsx file from a given path')
    .action(() => start());

exports.Command;
