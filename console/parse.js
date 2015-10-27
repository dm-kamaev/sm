var async = require('asyncawait/async');
var await = require('asyncawait/await');
var commander = require('commander');
var xlsx = require('node-xlsx');
var colors = require('colors');

var modules = require.main.require('./api/modules');
var schoolServices =
    require.main.require('./api/modules/school/services').schoolServices;

var replace = require('./parseConfig').replace;
var ignore = require('./parseConfig').ignore;
var exclusion = require('./parseConfig').exclusion;


var GOVERMENT_KEY_INDEX = 2,
    NAME_INDEX = 6,
    DIRECTOR_INDEX = 13,
    PHONES_INDEX = 15,
    SITE_INDEX = 17,
    ADDRESSES_INDEX = 20,
    EDU_PROGRAMM_INDEX = 21;


var getName = arr => {
    return arr[0];
};

var getType = arr => {
    if (arr.length > 1){
        return arr[1];
    } else {
        return 'unknown';
    }
};

var nameParse = item => {
    var str = item;
    var arr = [];
    var flag = true;

    for (var newName in replace) {
        if (flag) {
            replace[newName].forEach(oldName => {
                if (~str.indexOf(oldName)) {
                    str = str.replace(oldName, newName);
                    arr[1] = newName;
                    flag = false;
                }
            });
        }
    }

    if( ~str.indexOf("»") && !(~str.indexOf("«")) ){
        str = str.replace("»",'');
    }
    if(  (str.split("«").length) > (str.split("»").length) ){
        str = str.replace("«",'');
    }

    for(var ex in exclusion){
        str = str.replace(ex, exclusion[ex]);
    }

    for(var ignoreName in ignore){
        ignore[ignoreName].forEach(name => {
            if(~str.indexOf(name)) {
                arr[1] = ignoreName;
            }
        });
    }

    arr[0] = str;

    return arr;
};

var notIgnor = item => {
    for(ignorName in ignore){
        if( item == ignorName ){
            return false;
        }
    }
    if( item == 'unknown') {
        return false;
    }
    return true;
};

var getArray = (row, index) => {
    return row[index] ?
        row[index]
            .split(';')
            .map(item => item.trim()) :
        [];
};

var getEducationInterval = (programms) => {
    var res = {
            begin: -1,
            end: -1
        },
        types = [
            {
                regExp: /дошкольное образование/i,
                begin: 0,
                end: 0
            }, {
                regExp: /начальное общее образование/i,
                begin: 1,
                end: 4
            }, {
                regExp: /основное общее образование/i,
                begin: 5,
                end: 9
            }, {
                regExp: /среднее общее образование/i,
                begin: 10,
                end: 11
            }
        ];

    types.forEach(item => {
        if (programms.search(item.regExp) >= 0) {
            if (res.begin == -1) {
                res.begin = item.begin;
            }
            res.end = item.end;
        }
    });

    return [res.begin, res.end];
};

var rowToSchool = row => {
    var nParse = nameParse(row[NAME_INDEX]);
    var schoolName = getName(nParse);
    var schoolType = getType(nParse);

    return {
        name: schoolName,
        schoolType: schoolType,
        director: row[DIRECTOR_INDEX],
        phones: getArray(row, PHONES_INDEX),
        site: row[SITE_INDEX],
        addresses: getArray(row, ADDRESSES_INDEX),
        goverment_key: row[GOVERMENT_KEY_INDEX],
        educationInterval: getEducationInterval(row[EDU_PROGRAMM_INDEX]),
        coords: []
    };
};


var parseSchool = async(schoolData => {
    var params = {
        where: {
            goverment_key: schoolData.goverment_key
        }
    };
    var school = await(schoolServices.get(params, {count: 'one'}));
    if (school)
        schoolServices.update(school, schoolData);
    else
        schoolServices.create(schoolData);
});

var parse = async(path => {
    var parsed = xlsx.parse(path),
        data = parsed[0].data;

    data.map(rowToSchool)
        .filter((item, index) => (index > 0) && notIgnor(item.schoolType))
        .forEach(item => parseSchool(item));
});


// Settings for accessing this script using cli
commander
    .command('parse <path>')
    .description('Parses an .xlsx file from a given path')
    .action(file => parse(file));

exports.Command;
