'use strict';

const commander = require('commander');
const logger = require('../app/components/logger/logger.js').getLogger('app');
import {service as cityService} from '../api/modules/geo/services/city';
import {CityInstance} from '../api/modules/geo/types/city';

const start = async function() {
    try {
        const moscow: CityInstance = await cityService.getByData({
            where: {
                name: {
                  $ilike: '%москва%'
                }
            }
        });
        await cityService.update(moscow.id, 'москва');
        logger.info('Success update moscow');
    } catch (error) {
        logger.critical(error);
    }
};


commander
    .command('insertRegionForMoscow')
    .action(() => start());

exports.Command;
