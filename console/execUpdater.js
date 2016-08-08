'use strict';

const fs = require('fs');
const path = require('path');

const async = require('asyncawait/async');

const commander = require('commander');

const updaterPath = path.join(__dirname, 'modules', 'updater');

const updaterModule = require(updaterPath);
const updateDatabase = updaterModule.updateDatabase;

const COMMAND_NAME = 'updateTask';

var exec = async(function(inputFileName) {
    if (typeof inputFileName === 'string') {
        const updaterDirPath = path.join(updaterPath, 'updater');
        const parsersDirPath = path.join(updaterDirPath, 'parsers');
        const taskAssetsPath = inputFileName;
        
        const handler = async(require(updaterDirPath));
        const parsers = require(parsersDirPath);
    
        updateDatabase(taskAssetsPath, handler, parsers);
    
    } else {
        throw new Error(
            '\n\n\tNot found task in command line arguments.\n\n' +
            '\tUse command: node \'path/to/commander\' ' +
            COMMAND_NAME + ' \'path/to/assets/file\'\n\n'
        );
    }
});

commander
    .command(COMMAND_NAME)
    .description('Creates archived csv for page table based on school data')
    .action((inputFileName) => exec(inputFileName));

exports.Command;
