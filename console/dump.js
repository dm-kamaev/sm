const dbConfig = require.main.require('./api/config').db;
const scpConfig = require.main.require('./api/config').scp;
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
const scp = require('scp');    


var start = function() {
    checkDumpFolder();
    var vars = [
        'Create db dump file [local]', 
        'Create db dump file [local] and write it to config as current', 
        'Create db dump file [remote]',
        'Create db dump file [remote] and write it to config as current', 
        'Load db dump from the local storage',
        'Load db dump from the remote storage',
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
            dump({remote:true});
            break;
        case 3:
            dump({config:true, remote:true});
            break;
        case 4: 
            load();
            break;
        case 5: 
            loadFromRemote();
            break;
        case 6:
            check();
            break;
        case 7:
            dropAll();
            break;
    }
};

var checkDumpFolder = function() {
    if (!common.fileExists(DUMP_FOLDER)) {
        fs.mkdirSync(DUMP_FOLDER);
    }
};

var dropAll = async(()=> {
    await(sequelize.queryInterface.dropAllTables());
    await(sequelize.queryInterface.dropAllEnums());
});

var loadFromRemote = async(function() {
    var filename = DUMP_FOLDER + dbConfig.dump;
    await(download(dbConfig.dump));
    await(load());
});

var load = async(function(){
    var filename = DUMP_FOLDER + dbConfig.dump;
    if (!common.fileExists(filename)) {
        throw new Error('Cant find the file');
    }
    await(dropAll());
    var command = 'pg_restore -d ' + dbConfig.name + 
        ' ' + filename; 
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

var dump = async(function(opt_params) {
    var params = opt_params || {};
    var time = new Date();
    var timestring = leadZero(time.getFullYear()) +
        leadZero(time.getMonth()) + leadZero(time.getDate()) +
        leadZero(time.getHours()) + leadZero(time.getMinutes()) +
        leadZero(time.getSeconds());
    var dumpName = getBranchName() + SEPARATOR + timestring + '.dump';
    var filename = DUMP_FOLDER + dumpName;
    if (common.fileExists(filename)) {
        throw new Error('File already exists');
    }

    var command = 'pg_dump -Fc ' + dbConfig.name +
        ' > ' + filename;
    var execRes = await(execAsync(command));
    if (typeof execRes != 'Error' && execRes == 'succsess') {
        console.log('file ' + colors.green(filename) + 'created! ');

        if (params.remote) {
            await(upload(filename));
        }  
        if (params.config) {
            var newConfig = require.main.require('./api/config');
            newConfig.db.dump = dumpName;
            var js = JSON.stringify(newConfig);
                fs.writeFileSync('./api/config.json', js);
        }
    } else {
        throw execRes;
    }
});

var execAsync = async(function (execString) {
    var doExec = new Promise( function(resolve, reject) {
        exec(execString, {maxBuffer: 1024 * 500},  
            function (error, stdout) {
                console.log(stdout);
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    resolve('succsess');
                }
            });
    });
    return await(doExec);
});

/**
 * @param {string} filename
 */
var download = async(function(filename) {
    var execString = 'scp ' + scpConfig.login + '@' +
            scpConfig.host + ':' + scpConfig.path + '/' +
            filename + ' ' + DUMP_FOLDER;
    console.log(execString);
    var execRes = await(execAsync(execString));
    if (typeof execRes != 'Error' && execRes == 'succsess') {
        console.log('Download ' + colors.green('succsess!'));
    } else {
        throw execRes;
    }
});

/**
 * @param {string} filename
 */
var upload = async(function(filename) {
    var execString = 'scp ' + filename + ' ' + scpConfig.login + '@' +
            scpConfig.host + ':' + scpConfig.path;
    if (!common.fileExists(filename)) {
        throw new Error('Cant find the file');
    }
    var execRes = await(execAsync(execString));
    if (typeof execRes != 'Error' && execRes == 'succsess') {
        console.log('Upload ' + colors.green('succsess!'));
    } else {
        throw execRes;
    }
});






commander
    .command('dump')
    .description('Dump file operations')
    .action(() => start());

exports.Command;

