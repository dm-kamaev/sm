/**
 * Для получения токена следует перейти по
 * https://oauth.vk.com/authorize?client_id=5063331&display=page&redirect_uri=http://mel.fm&response_type=token&v=5.37
 * и скопировать токен из адресной строки в файл token.json
 *
 */
var schoolServices = require.main.require('./api/modules/school/services').schoolServices;
var univerServices = require.main.require('./api/modules/school/services').univerServices;
var commander = require('commander');
var https = require('https');
var colors = require('colors');
var sleep = require('sleep');
var fs = require('fs');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var readlineSync = require('readline-sync');
var xlsx = require('node-xlsx');
var vkIgnore = require('./vkignore');
const ACCESSS_TOKEN = require('./token.json').value;
const START_YEAR = 2013;
const END_YEAR = 2015;
const RETRY_COUNT = 10;



var start = async(() => {
    console.log('\nWhich script to launch?');
    console.log('\t' + colors.green('1) ') + 'Get matches and write them to file');
    console.log('\t' + colors.green('2) ') + 'Get matches from excel file');
    console.log('\t' + colors.green('3) ') + 'Process matches file');
    console.log('\t' + colors.green('4) ') + 'Write processed matches to db');
    console.log('\t' + colors.green('5) ') + 'Count items in JSON file');
    var answer;
    while (!answer) {
        answer = readlineSync.prompt();
        switch (answer) {
            case '1':
                await(GetMatches());
                break;
            case '2':
                await(ParseExcel());
                break;
            case '3':
                await(ProcessMatches());
                break;
            case '4':
                await(WriteDB());
                break;
            case '5':
                await(CountJSON());
                break;
            default:
                console.log('Type number from 1 to 5');
                answer = null;   
                break;
        }
    }
});

var CountJSON = async(() => { 
    var answerPath = readlineSync.question('Type filename of json\n');
    try {
        var json = loadFromJson(answerPath);
        console.log ('JSON length: ' + json.length);
    } catch (e) {
        console.log(e.message);
    }
}); 

var GetMatches = async(() => {
    var schools = await(getSchools());
    var ourSchools = await(schoolServices.list());
    console.log('Школ вконтакте: ' + colors.yellow(schools.response.items.length));
    console.log('Наших школ: ' + colors.yellow(ourSchools.length));
    var matches = compareMatches(schools.response.items, ourSchools);
    console.log(('================================').yellow);
    console.log('Количество совпадений: ' + colors.yellow(matches.length));
    console.log(('================================').yellow);
    //await(processMatches(matches));
});

var WriteDB = async (() => {
    var answerPath = readlineSync.question('Type filename of processed matches file. Default is \"pr_matches.json\"\n');
    var path = answerPath ? answerPath : 'pr_matches.json';
	console.log('Processing can take a while');
	try {
		await (writeResultsFromJsonToBd(path));
	} catch (err) {
		console.log(err.message);
		process.exit();
	}
	console.log('done');
});

var ParseExcel = async(() => {
    var answerPath = readlineSync.question('Type filename of excel file. Default is \"extraData.xlsx\"\n');
    var path = answerPath ? answerPath : 'extraData.xlsx';
    var answerOutPath = readlineSync.question('Type filename of output file. Default is \"matches.json\"\n');
    var outPath = answerOutPath ? answerOutPath : 'matches.json';
	await(parseExcel(path, outPath));
});


var parseExcel = async((path, outPath) => {
	var parsed = xlsx.parse(path),
        data = parsed[0].data,
		matches = [];
    await (data.forEach((row, index) => {
		if (index) {	
			rowResult = await(processRow(row));
			matches = matches.concat(rowResult);
		}
	}));
    saveToJson(matches, outPath);
});

var ProcessMatches = async(() => {
    try {
        var answerInPath = readlineSync.question('Type filename of matches file to process. Default is \"matches.json\"\n');
        var inPath = answerInPath ? answerInPath : 'matches.json';
        var matches = loadFromJson(inPath);
        var answerOutPath = readlineSync.question('Type filename of output file. Default is \"pr_matches.json\"\n');
        var outPath = answerOutPath ? answerOutPath : 'pr_matches.json';
        await(processMatches(matches, outPath));
    } catch (e) {
        console.log(e.message);
    }
});

var getSchools = async ((cityId) => {
    cityId = cityId ? cityId : 1;
    return await (request('database.getSchools',{
        city_id: cityId,
        count: 5000
    }));
});

 
var compareMatches = (vkSchools, ourSchools) => {
    var results = [],
        extraResults = [],
        notFound = [];
    for (var i = 0; i<ourSchools.length; i++ ){
        var firstSchool = ourSchools[i].name.toLowerCase();
        var preciseMatch = vkSchools.find(vks => {
            var secondSchool = vks.title.toLowerCase();
            if (firstSchool.trim() == secondSchool.trim())
                return true;
        });
        if (preciseMatch) {
			preciseMatch.ourId = ourSchools[i].id;
            results.push(preciseMatch);
		}
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
    console.log('Количество точных совпадений: ' + colors.yellow(results.length) +
            '. Они записаны в файл ' + colors.yellow('matches.json'));
    console.log('Количество примерных совпадений: ' + 
            colors.yellow(extraResults.length) +
            '. Они записаны в файл ' + colors.yellow('extra.json'));
    console.log('Количество не найденых совпадений: ' + 
            colors.yellow(notFound.length) +  
            '. Они записаны в файл ' + colors.yellow('notFound.json'));
    return results;
};


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
    for (var i = START_YEAR; i <= END_YEAR; i++) {
        if (vkIgnore.find(el => el.vkId == schoolId && el.year == i))
            console.log('School ' + colors.red(school.title) + 
                ' year ' + colors.red(i) + ' in ignore');
        else {
            var yearParams = params;
            yearParams.school_year = i;
            var reqTry = 0,
                answ;
            do {
                answ = await(request('users.search', yearParams));
                if (!answ) {
                    console.log('Didnt get anything after ' + colors.red(reqTry+1) +
                           ' try ' + school.title + ' year ' + colors.red(i));
                    if (!reqTry) {
                        console.log('Going to sleep for 60 seconds');
                        sleep.sleep(60); //sleep for 60 seconds
                    }
                }
                reqTry++;
            } while (!answ && reqTry < RETRY_COUNT);
            if (answ && !answ.skip) {
                if (answ.response.count > 1000) {
                    console.log('There are too many results in school ' + colors.red(school.title) +
                        ' year ' + colors.red(i));
                }
                else {
                    results.push({
                        year:i,
                        results: answ.response.items
                    });
                }
            }
        }
	}
    return results;
});


/**
 * request to vk api
 */
var request = async ((methodName, params) => {
    var paramsString = '';
    for (var prop in params){
        paramsString += (prop + '=' + params[prop] + '&');
    }
    var apiString = '/method/' + methodName + '?' + paramsString +
        'v=5.8&access_token=' + ACCESSS_TOKEN;

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
    if (!res.response) { 
        sleep.sleep(1);
        console.log(colors.red('Didnt get any res.response'));
        return null;
    } 
	if (res.response.count === 0) {
		var answer;
		console.log(colors.red('WARNING'));
		while (answer!='S' && answer!='T')
        	answer = readlineSync.question('Response count = 0. Type \'S\'' +
						   'to skip school\\year or \'T\' to try again\n');
		return answer == 'S'? 
		{
			skip: true
		} : null;
	}
    return res;

});


/**
 * trying to find all the numbers in both strings 
 * and comparing them. Used in getting matches
 */
var compareNumbers = (string1, string2) => {
    var numArr1 = string1.match(/\d+/g) || [],
        numArr2 = string2.match(/\d+/g) || [],
	isFound = false;
    numArr1.forEach(num1 => {
	    numArr2.forEach(num2 => {
		    if (num1 && num1 == num2){
		    	isFound = true;
		    }
	    });
    }); 
    return isFound;
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
        console.log('File ' + colors.yellow(name) +
            ' is not found and will be created now');
        fs.writeFileSync(name, '[]');
    }
    return require('../' + name);
};

var processMatch = async((match) => {
    var local_match = match;
    var resultsArr = [];
    var users = await(getSchoolUsers(local_match));
    if (users || users.length !== 0){
        users.forEach(userYear => {
            var yearResults = {
                year: userYear.year,
                universities: []
                };
            var uniCountForYear = 0;
            userYear.results.forEach(user => {
                var uni = user.university_name;
                if (uni) {
                    uniCountForYear++;
                    var uniInArray = yearResults.universities.find(univ => {
                    if (univ.name == uni)
                        return true;
                    });
                    if (uniInArray)
                        uniInArray.count++;
                    else
                        yearResults.universities.push({
                            vkId: user.university,
                            name: uni,
                            count: 1
                        });
                }
            });
            yearResults.total = uniCountForYear;
            resultsArr.push(yearResults);
        });
        local_match.years= resultsArr;
    } else {
        console.log('Got nothing for ' + colors.red(match.title));
    }
    return local_match;
});

var processMatches = async((matches, outPath)=> {    
	console.log('Getting universities for schools. Patience');
    var cached_matches = loadFromJson(outPath);
    var processed_matches = [];
	matches.forEach(match =>{
        var cached_match = cached_matches.find(cachedMatch =>{
            if (cachedMatch.id == match.id &&
                cachedMatch.ourId == match.ourId)
                return true;
        });
        if (cached_match){
            console.log('Users for school ' +
                colors.green(cached_match.title) + ' already cached');
            processed_matches.push(cached_match);
        } else {
            var processedMatch = await(processMatch(match));
            processed_matches.push(processedMatch);    
        }
        saveToJson(processed_matches, outPath);
    });
});

var writeResultsFromJsonToBd = async ((path)=> {
	var json = loadFromJson(path);
	await(
		json.forEach ((school)=>{
			writeSchoolToBd(school);
		})
	);
});

/** Writes one school with universities (from processMatchess result array) to database. 
 * 
 */
var writeSchoolToBd = async ((school)=> {
	univerServices.addSchoolResults(school);
});

var processRow = async((row) => {
	var schoolName = row[1].trim(),
		rowResults = [],
		school = await (schoolServices.getOneNudeByName(schoolName));
	if (!school)
		throw new Error('cant find ' + schoolName);
	for (var i = 2; i <= 46; i+=2){
		if (row[i])
			rowResults.push({
				id: row[i],
				title: row[i+1],
				ourId: school.id
			});
	}
	return rowResults;
});




commander
    .command('vkUpdate')
    .description('Updates vk skhools and writes them to json')
    .action(() => start());

exports.Command;
