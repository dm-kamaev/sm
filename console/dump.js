'use strict'
const dbConfig = require.main.require('./api/config').db;
var scpConfig = require.main.require('./api/config').scp;
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const commander = require('commander');
const colors = require('colors');
const readlineSync = require('readline-sync');
const fs = require('fs');
const DUMP_FOLDER = './assets/dump/';
const common = require.main.require('./console/common');
const SEPARATOR = '_';
const sequelize = require.main.require('./app/components/db');


var start = async(function() {
    var vars = [
        'Create db dump file [local]', 
        'Create db dump file [local] and write it to config as current', 
        'Create db dump file [remote]',
        'Create db dump file [remote] and write it to config as current', 
        'Load db dump from the local storage',
        'Load db dump from the remote storage',
        'Load db dump from the remote storage by name',
        'Show current config',
        'Drop all tables'],
    index = readlineSync.keyInSelect(vars, 'What to do?');
    switch (index) {
        case 0: 
            var dumpCreator = new DumpCreator();
            dumpCreator.create();
            break;
        case 1:
            var dumpCreator = new DumpCreator({
                config: true
            });
            dumpCreator.create();
            break;
        case 2: 
            var dumpCreator = new DumpCreator({
                remote: true
            });
            dumpCreator.create();
            break;
        case 3:
            var dumpCreator = new DumpCreator({
                config: true,
                remote: true
            });
            dumpCreator.create();
            break;
        case 4:
            var dumpLoader = new DumpLoader();
            dumpLoader.load();
            break;
        case 5: 
            var dumpLoader = new DumpLoader({
                remote: true
            });
            dumpLoader.load();
            break;
        case 6: 
            var dumpLoader = new DumpLoader({
                remote: true,
                askName: true
            });
            dumpLoader.load();
            break;
        case 7:
            DumpHelper.checkConfig();
            break;
        case 8:
            DumpHelper.dropAll();
            break;
    }
});

class DumpCreator {
    /**
     * @public
     * @param {object opt_params}
     */
    constructor(opt_params) {
        opt_params = opt_params || {};
        this.isUpdateConfig_ = opt_params.config || false;
        this.isToRemote_ = opt_params.remote || false;
    }
    
    /**
     * @public
     */
    create() {
        common.checkDir(DUMP_FOLDER);
        if (!scpConfig)
            DumpHelper.fixConfig();
        var filename = this.generateFilename_();
        var filePath = DUMP_FOLDER + filename;
        if (common.fileExists(filePath)) 
            throw new Error('File already exists');
        var command = 'pg_dump -Fc ' + dbConfig.name +
            ' > ' + filePath;
        var execRes = await(common.execAsync(command));
        if (execRes.success) {
            console.log('file ' + colors.green(filename) + ' created! ');
            if (this.isToRemote_) {
                await(this.upload_(filePath));
            }  
            if (this.isUpdateConfig_) {
                await(this.updateConfig_(filename));
            }
        } else {
            throw execRes;
        }
    }
       

    /**
     * @private 
     * @param {string} filePath
     */
    upload_(filePath) {
        if (!common.fileExists(filePath)) {
            throw new Error('Cant find the file');
        }
        var execString = 'scp ' + filePath + ' ' + scpConfig.login + '@' +
                scpConfig.host + ':' + scpConfig.path;
        var execRes = await(common.execAsync(execString));
        if (execRes.success) {
            console.log('Upload ' + colors.green('success!'));
        } else {
            throw execRes;
        }
    };

    /**
     * @private
     * @param {string} filename
     */
    updateConfig_(filename) {
        var newConfig = common.loadJson('./api/config.json');
        newConfig.db.dump = filename;
        common.saveJson(newConfig, './api/config.json');
    }
    /**
     * @private
     * @return {string}
     */
    generateFilename_() {
        var timeStamp = this.getTimeStamp_();
        var branchName = this.getBranchName_();
        var filename =  timeStamp + '.dump';
        if (branchName)
            filename = branchName + SEPARATOR + filename;
        return filename;
    }


    /**
     * @private
     * @return {string}
     */
    getTimeStamp_() {
        var time = new Date();
        var timestring = time.getFullYear() +
            this.leadZero_(time.getMonth() + 1) + this.leadZero_(time.getDate()) +
            this.leadZero_(time.getHours()) + this.leadZero_(time.getMinutes()) +
            this.leadZero_(time.getSeconds());
        return timestring;
    }

    /**
     * @private
     * @param {number} num
     * @return {string}
     */
    leadZero_(num) {
        return ('0' + num).slice(-2); 
    }
    
    /**
     * @private
     * @return {string || null}
     */
    getBranchName_() {
        if (common.fileExists('./.git/HEAD')) {
            var headstr = common.readText('./.git/HEAD');
            return headstr
                .replace(/ref: refs\/heads\//,'')
                .trim();
        } else {
            return null;
        }
    }
}

class DumpHelper {

    static dropAll() {
        await(sequelize.queryInterface.dropAllTables());
        await(sequelize.queryInterface.dropAllEnums());
    }

    static checkConfig() {
        var dump = dbConfig.dump,
            db = dbConfig.name,
            branch = dump.split(SEPARATOR)[0], //TODO: if no config?
            time = dump.split(SEPARATOR)[1],
            dumpStr = (branch && time) ? 
                'Dump: ' + colors.green(branch) + SEPARATOR + time :
                'Dump: ' + dump;
        console.log (dumpStr);
        console.log ('Database: ' + colors.yellow(db));
    }

    /**
     * Crutch for machines with broken config
     */
    static fixConfig() {
        var newConfig = common.loadJson('./api/config.json');
        newConfig.scp = {
            login: 'uploader',
            pass: 'gTgCuHrHuEnNnacpxStR',
            host: 'repo.dfarm.lan',
            path: '/home/uploader/shared',
            port: '22'
        };
        common.saveJson(newConfig, './api/config.json');
        scpConfig = newConfig.scp;
    }

}

class DumpLoader {
    /**
     * @public
     * @param {object} opt_params
     */
    constructor(opt_params) {
        opt_params = opt_params || {};
        this.isFromRemote_ = opt_params.remote || false;
        if (opt_params.askName) 
            this.filename_ = readlineSync.question('Please type dump filename from http://repo.dfarm.lan/db/ :');
        else 
            this.filename_ = dbConfig.dump;
    }

    /**
     * @public
     */
    load() {
        if (this.isFromRemote_) {
            if (common.fileExists(DUMP_FOLDER + this.filename_))
                console.log('Found local version of dump file');
            else
                await(this.download_());
        }
        this.load_();
    }


    /**
     * @private
     */
    download_() {
        var execString = 'scp ' + scpConfig.login + '@' +
                scpConfig.host + ':' + scpConfig.path + '/' +
                this.filename_ + ' ' + DUMP_FOLDER;
        var execRes = await(common.execAsync(execString));
        if (execRes.success) {
            console.log('Download ' + colors.green('succsess!'));
        } else {
            throw execRes;
        }
    }

    /**
     * @private
     */
    load_() {
        var filePath = DUMP_FOLDER + this.filename_;
        if (!common.fileExists(filePath)) 
            throw new Error('Can\'t find the file');
        await(DumpHelper.dropAll());
        var command = 'pg_restore -d ' + dbConfig.name + 
            ' ' + filePath;
        await(common.execAsync(command));
    }
}





commander
    .command('dump')
    .description('Dump file operations')
    .action(() => start());

exports.Command;

