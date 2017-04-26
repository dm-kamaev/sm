'use strict';

// author: dm-kamaev
// node commander.js addedNewSubject
// add new subject

import * as commander from 'commander';
const logger = require('../app/components/logger/logger.js').getLogger('app');
const sequelize = require('../app/components/db.js');
const services = require('../app/components/services').all;

class AddedNewSubject {
    constructor() {}

    public async start() {
        logger.info('-----START-----');
        const newSubjects: string[] = [
            'Информатика и ИКТ',
            'Иностранный язык',
        ];
        try {
          const option = {type: sequelize.QueryTypes.SELECT};
          newSubjects.forEach(async(displayName: string) => {
              const query: string = `
              SELECT id FROM subject WHERE display_name='${displayName}'
              `;
              try {
                const subject = await sequelize.query(
                    query,
                    option
                );
                if (!subject.length) {
                    await services.subject.create({
                      name: displayName.toLowerCase(),
                      displayName: displayName,
                      alias: services.urls.stringToURL(displayName),
                    });
                }
              } catch (error) {
                console.log('error=', error);
              }
          });
        } catch (error) {
            console.log('ERROR=', error);
        }
        logger.info('-----THE END-----');
    }
};

commander
    .command('addedNewSubject')
    .action(async() => {
        await new AddedNewSubject().start();
    });

exports.Command;

