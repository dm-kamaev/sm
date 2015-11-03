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

var getSchoolUsersDay = async ((params)=> {
    var res = []
    for (var i = 1; i <= 31; i++) {
        var dayParams =  params;
        dayParams.birth_day = i;
        var dayRes = await (request('users.search',dayParams));
        if (dayRes.response.count>1000){
            //throw new Error();
            console.log(colors.red('по дню много людей: ' + dayRes.response.count));
            res = res.concat(dayRes.response.items);
        } else
            res = res.concat(dayRes.response.items);
    }
    return res;
});

var getUserfulUsers = (users=>{
    console.log(colors.yellow('users found: '+users.length));
    var results = [];
    users.forEach(user => {
        if (/*user.university*/true)
            results.push(user);
    })
    //console.log(colors.yellow('usefull: '+results.length));
    return results;
});

var getSchoolUsersMonth = async ((params)=>{
    var res = []
    for (var i = 1; i <= 12; i++) {
        var monthParams = params;
        monthParams.birth_month = i;
        var monthRes = await (request('users.search',monthParams));
        if (monthRes.response.count>1000){
            console.log(colors.red('по меесяцу много людей: ' + monthRes.response.count));
            res = res.concat(getUserfulUsers(monthRes.response.items));
        }
        else {
            console.log(colors.green(JSON.stringify(monthParams)));
            var users = monthRes.response.items;
            var userfull = getUserfulUsers(users);
            res = res.concat(userfull);
        }
    }
    return res;
});

var getSchoolUsers = async ((schoolId) => {
    var results = [];
    var params = {
        fields:'education',
        school: schoolId,
        count: 1000
    }
    for (var i = 2013; i <= 2013; i++) {
        var yearParams = params;
        yearParams.school_year = i;
        var answ = await (request('users.search',yearParams));
        if (answ.response.count>1000) {
            console.log(colors.yellow(JSON.stringify(yearParams)
                + ' \n too many answers ('+answ.response.count
                + '). Starting processing by birth month'));
            var monthRes = await(getSchoolUsersMonth(yearParams));
            console.log(colors.green(JSON.stringify(yearParams)
                + 'got results by year:  '
                + JSON.stringify(monthRes.length)));
            results = results.concat(monthRes);
        }
        else {
            console.log(colors.green(JSON.stringify(yearParams)
                + 'got results by year:  '
                + JSON.stringify(answ.response.item)));
            results = results.concat(answ.response.items)
        }
        console.log(colors.yellow(answ.response.count));
        console.log(colors.green(results.length));
    }
    //console.log(colors.green(JSON.stringify(answ.response.items[3])));
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
    var doRequest = new Promise( function(resolve, reject) {
        https.request(options).on('response', function (response) {
            var data = '';
            response.on("data", function (chunk) {
                data += chunk;
            });
            response.on('end', function () {
                resolve(JSON.parse(data));
                sleep.usleep(210000);
            });
        }).end()
    });

    var res
    do {
        if (res && res.error) {
            console.log(colors.red('ERROR: ' + res.error.error_msg));
            console.log(colors.yellow('Params:'));
            console.log(colors.yellow(JSON.stringify(params)));
            sleep.sleep(10);
        }
        res = await(doRequest);
    } while (res.error && res.error.error_code == 6)

    if (!res.response || res.response.count == 0){
        console.log(colors.red("Error on request:"));
        console.log(colors.red(JSON.stringify(res)));
        throw new Error('');
    }
    return res;

});

var getMatches = (vkSchools, ourSchools) => {
    var n = 0;
    var results = []
    for (var i = 0; i<ourSchools.length; i++ ){
        for (var j = 0; j<vkSchools.length; j++){
            //console.log(colors.yellow(n)+') '+colors.green(ourSchools[i].name)+
            //         ' '+colors.red(vkSchools[j].title));
            if (ourSchools[i].name == vkSchools[j].title)
                results.push(vkSchools[j].title);
            n++;
        }
    }
    return results;
}

var saveToJson = (schools) => {
    var js = JSON.stringify(schools);
    fs.writeFileSync('vk_schools.json',js);
}

var start = async(() => {
    // console.log(colors.green(await(getSchools())));
    //getSchoolUsers(8243);
    var schools = await(getSchools());
    var ourSchools = await(schoolServices.list());
    console.log('Школ вконтакте: ' + colors.yellow(schools.response.items.length));
    console.log('Наших школ: ' + colors.yellow(ourSchools.length));
    var matches = getMatches(schools.response.items, ourSchools);
    console.log(('================================').yellow);
    console.log('Количество совпадений: ' + colors.yellow(matches.length));
    console.log(matches);
})

commander
    .command('vkapi')
    .description('Parses an .xlsx file from a given path')
    .action(() => start());

exports.Command;
