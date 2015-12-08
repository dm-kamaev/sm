const dbConfig = require.main.require('./api/config').db;
const exec = require('child_process').exec;
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const commander = require('commander');
const colors = require('colors');
const readlineSync = require('readline-sync');
const fs = require('fs');
const DUMP_FOLDER = './assets/dump/';
const PROJECT_NAME = 'BP';
const common = require.main.require('./console/common');
const SEPARATOR = '_';
const sequelize = require.main.require('./app/components/db');
    
var start = function() {
    var vars = [
        'Create db dump file', 
        'Create db dump file and write it to config as current', 
        'Load db dump',
        'Show current config',
        'Drop all tables'],
    index = readlineSync.keyInSelect(vars, 'What to do?');
    switch (index) {
        case 0: 
            dump();
            break;
        case 1:
            dump({config:true});
            break;
        case 2: 
            load();
            break;
        case 3:
            check();
            break;
        case 4:
            dropAll();
            break;
    }
};

var dropAll = async(()=>{
    await(sequelize.queryInterface.dropAllTables());
    await(sequelize.queryInterface.dropAllEnums());
});

var load = async(function() {
    var filepath = DUMP_FOLDER + dbConfig.dump;
    if (!common.fileExists(filepath))
        throw new Error('Can\'t find the dump file!');
    await(dropAll());
    var command = 'pg_restore -d ' + dbConfig.name + 
        ' ' + filepath;
    exec(command, {maxBuffer: 1024 * 500},  
        function (error, stdout) {
            console.log(stdout);
            if (error)
                console.log(error);
        });
});

var leadZero = function (num) {
    return ('0' + num).slice(-2); 
};

var getBranchName = function() {
    var headstr = common.readText('./.git/HEAD');
    return headstr
        .replace(/ref: refs\/heads\//,'')
        .trim();
};

var check = function() {
    var dump = dbConfig.dump,
        db = dbConfig.name,
        branch = dump.split(SEPARATOR)[0],
        time = dump.split(SEPARATOR)[1],
        dumpStr = (branch && time) ? 
            'Dump: ' + colors.green(branch) + SEPARATOR + time :
            'Dump: ' + dump;
   console.log (dumpStr);
   console.log ('Database: ' + colors.yellow(db));
};

var dump = function(opt_params) {
    var params = opt_params || {};
    var time = new Date();
    var timestring = leadZero(time.getFullYear()) +
        leadZero(time.getMonth()) + leadZero(time.getDate()) +
        leadZero(time.getHours()) + leadZero(time.getMinutes()) +
        leadZero(time.getSeconds());
    var dumpName = getBranchName() + SEPARATOR + timestring + '.dump';
    var command = 'pg_dump -Fc ' + dbConfig.name +
        ' > ' + DUMP_FOLDER + dumpName;
    exec(command, {maxBuffer: 1024 * 500},  
        function (error, stdout) {
            console.log(stdout);
            if (error)
                console.log(error);
            else 
                console.log(colors.green(dumpName) + ' created');
        });
    if (params.config){
        var newConfig = require.main.require('./api/config');
        newConfig.db.dump = dumpName;
        var js = JSON.stringify(newConfig);
            fs.writeFileSync('./api/config.json', js);
    }
};


commander
    .command('dump')
    .description('Dump file operations')
    .action(() => start());

exports.Command;

