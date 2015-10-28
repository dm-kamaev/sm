var commander = require('commander');
var https = require('https');
var colors = require('colors');

var async = require('asyncawait/async');
var await = require('asyncawait/await');

const ACCESSS_TOKEN = require('./token.json').value;

var start = async(() => {
    var params = {
        user_id: '66748'
    }
    request('users.get',params);
})



var request = async ((methodName, params) => {
    var paramsString = '';
    for (prop in params){
        paramsString += (prop + '=' + params[prop] + '&');
    }
    var apiString = '/method/' + methodName + '?' + paramsString
        + 'v=5.37&access_token=' + ACCESSS_TOKEN;

    var options = {
        host: 'api.vk.com',
        path: apiString,
        method: 'GET',
        headers : {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
            'Content-Type' : 'text/html; charset=utf-8'
        }
    };
    var doRequest = new Promise( function(resolve, reject) {
        https.request(options).on('response', function (response) {
            var data = '';
            response.on("data", function (chunk) {
                data += chunk;
            });
            response.on('end', function () {
                console.log(colors.yellow(options.path));
                console.log(colors.green(data));
                resolve(data);
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