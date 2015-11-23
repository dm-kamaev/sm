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

var load = function(){
    var command = 'pg_restore -c -d ' + dbConfig.name + 
        ' ' + DUMP_FOLDER + dbConfig.dump;
    exec(command, {maxBuffer: 1024 * 500},  
        function (error, stdout) {
            console.log(stdout);
            if (error)
                console.log(error);
        });
};

var dump = function(opt_params) {
    var params = opt_params || {};
    var time = new Date();
    var timestring = time.getFullYear().toString() +
        time.getMonth() + time.getDate() +
        time.getHours() + time.getMinutes() +
        time.getSeconds();
    var dumpName = PROJECT_NAME + '-' + timestring + '.dump';
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
}

var start = function() {
    var vars = ['Create db dump file', 'Create db dump file and write it to config as current', 'Load db dump'],
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
    }
}

commander
    .command('dump')
    .description('Dump file operations')
    .action(() => start());

exports.Command;

