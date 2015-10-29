/**
 * Для получения токена следует перейти по
 * https://oauth.vk.com/authorize?client_id=5063331&display=page&redirect_uri=http://mel.fm&response_type=token&v=5.37
 * и скопировать токен из адресной строки в файл token.json
 *
 */


var commander = require('commander');
var https = require('https');
var colors = require('colors');

var async = require('asyncawait/async');
var await = require('asyncawait/await');

const ACCESSS_TOKEN = require('./token.json').value;

var start = async(() => {
   // console.log(colors.green(await(getSchools())));
    getSchoolUsers(8243);
})

var getSchools = async ((cityId) => {
    cityId = cityId ? cityId : 1;
    return await (request('database.getSchools',{city_id: cityId}));
});

var getSchoolUsers = async ((schoolId) => {
    var params = {
        fields:'education',
        //age_from: '',
        //age_to: '',
        school: schoolId,
        
    }
    var answ = await (request('users.search',params));
    console.log(colors.yellow(answ.response.count));
    console.log(colors.green(JSON.stringify(answ.response.items[3])));
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
            });
        }).end()
    });
    return await (doRequest);
});

commander
    .command('vkapi')
    .description('Parses an .xlsx file from a given path')
    .action(() => start());

exports.Command;