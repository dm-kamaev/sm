'use strict';

// author: dm-kamaev
// node commander.js fixedEncodingProgramMajor
// fixed encode problem with letter й

import * as commander from 'commander';
const logger = require('../app/components/logger/logger.js').getLogger('app');
const sequelize = require('../app/components/db.js');
import {
    service as programMajorService
} from '../api/modules/university/services/programMajor';

class FixedEncodingProgramMajor {
    constructor() {}

    public async start() {
        logger.info('-----START-----');
        try {
           const programMajors = await programMajorService.getAll();
           const programMajorsUpdate = programMajors.map((programMajor) => {
               let name = programMajor.name;
               // replace to normal й
               name = name.replace(/\u0438\u0306/g, 'й');
               return { id: programMajor.id, name };
           });
           const promises = programMajorsUpdate.map(async(programMajor) => {
               return programMajorService.update(
                   programMajor.id,
                   {name: programMajor.name}
               );
           });
           await Promise.all(programMajorsUpdate);
        } catch (error) {
            console.log('ERROR=', error);
        }
        logger.info('-----THE END-----');
    }
};

commander
    .command('fixedEncodingProgramMajor')
    .action(async() => {
        await new FixedEncodingProgramMajor().start();
    });

exports.Command;

