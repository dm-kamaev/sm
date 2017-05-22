'use strict';

// author: dm-kamaev
// node commander.js updateCityNames
// update city's name first letter in upper case

import * as commander from 'commander';
const logger = require('../app/components/logger/logger.js').getLogger('app');
const sequelize = require('../app/components/db.js');
const services = require('../app/components/services').all;

class UpdateCityNames {
    constructor() {}

    public async start() {
        logger.info('-----START-----');
        const cities: Object[] = [
            {oldName: 'москва', newName: 'Москва'},
            {oldName: 'санкт-петербург', newName: 'Санкт-Петербург'}
        ];
        try {
          const option = {type: sequelize.QueryTypes.SELECT};
          cities.forEach(async(city: any) => {
              const query: string = `
              SELECT id FROM city WHERE name ILIKE '%${city.oldName}%'
              `;
              const cityDb = await sequelize.query(
                  query,
                  option
              );
              const cityId = cityDb[0] && cityDb[0].id;
              if (cityId) {
                  const update: string = `
                  UPDATE city SET name='${city.newName}' WHERE id=${cityId}
                  `;
                  await sequelize.query(
                      update,
                      option
                  );
              }
          });
        } catch (error) {
            console.log('ERROR=', error);
        }
        logger.info('-----THE END-----');
    }
};

commander
    .command('updateCityNames')
    .action(async() => {
        await new UpdateCityNames().start();
    });

exports.Command;

