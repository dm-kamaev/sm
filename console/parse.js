var commander = require('commander');
var xlsx = require('node-xlsx');

var modules = require.main.require('./api/modules');

var replace = require('./parseConfig');
var ignore = require('./parseIgnor');

var NAME_INDEX = 6,
    DIRECTOR_INDEX = 13,
    PHONES_INDEX = 15,
    SITE_INDEX = 17,
    ADDRESSES_INDEX = 20;


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
                    if (newName !== "Коррекционная школа") {
                        str = str.replace(oldName, newName);
                    } else {
                        str = str.replace(oldName, "Коррекционная школа ");
                    }
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

    str.replace("проГимназия","Прогимназия");

    str=str.replace('ГБОУ','');
    str=str.replace('ГКОУ','');

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
    if( item == 'Колледж') {
        return false;
    }
    if( item == 'Детский сад') {
        return false;
    }
    if( item == 'Техникум') {
        return false;
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

var rowToSchool = row => {
    var nParse = nameParse(row[NAME_INDEX]);
    var schoolName = getName(nParse);
    var schoolType = getType(nParse);
    return {
        name: schoolName,
        type: schoolType,
        director: row[DIRECTOR_INDEX],
        phones: getArray(row, PHONES_INDEX),
        site: row[SITE_INDEX],
        addresses: getArray(row, ADDRESSES_INDEX),
        coords: []
    };
};

var parse = path => {
    var parsed = xlsx.parse(path),
        data = parsed[0].data;
    var createSchoolDataBase = err => {
        console.log(err);
        data.map(rowToSchool).forEach(item => {
            if( notIgnor(item.type) ) {
                modules.school.models.School.create(item);
            }
        });
    };

    modules.school.models.School.sync({force:true}).then(createSchoolDataBase, createSchoolDataBase);
};

// Settings for accessing this script using cli
commander
    .command('parse <path>')
    .description('Parses an .xlsx file from a given path')
    .action(file => parse(file));
