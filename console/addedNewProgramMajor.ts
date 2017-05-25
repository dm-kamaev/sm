'use strict';

// author: dm-kamaev
// node commander.js addedNewProgramMajor
// add new program major

import * as commander from 'commander';
const logger = require('../app/components/logger/logger.js').getLogger('app');
const sequelize = require('../app/components/db.js');
import {
    service as programMajorService
} from '../api/modules/university/services/programMajor';

class AddedNewProgramMajor {
    constructor() {}

    public async start() {
        logger.info('-----START-----');
        const newProgramMajor: string[] = [
            'Электроника, радиотехника и системы связи',
            'Клиническая медицина',
            'Фармация',
            'Техника и технологии наземного транспорта',
            'Фундаментальная медицина',
            'Экранные искусства',
            'Науки о здоровье и профилактическая медицина',
            'Математика, механика и статистика',
            'Экология',
            'Геология и география',
            'Архитектура и строительство',
            'Информатика и программирование',
            'Ядерная энергетика и ядерная физика',
            'Машиностроение и робототехника',
            'Авиастроение',
            'Инноватика',
            'Экономика и менеджмент',
            'Управление персоналом',
            'Государственное и муниципальное управление',
            'Бизнес-информатика',
            'Политология и регионоведение',
            'Международные отношения',
            'Реклама и связи с общественностью',
            'Журналистика',
            'Филология, лингвистика, языкознание',
            'История, антропология и археология',
            'Культурология и социокультурные проекты',
            'Дизайн',
            'Ландшафтная архитектура',
            'Металлургия и технологии металлов',
            'Стандартизация',
        ];
        try {
          const option = {type: sequelize.QueryTypes.SELECT};
          newProgramMajor.forEach(async(name) => {
              let query: string = `
              SELECT id FROM program_major WHERE name='${name}'
              `;
              const programMajor = await sequelize.query(
                  query,
                  option
              );
              if (!programMajor.id) {
                  query = `
                  INSERT INTO program_major
                  VALUES (
                      DEFAULT,
                      '${name}',
                      CURRENT_TIMESTAMP,
                      CURRENT_TIMESTAMP
                   )
                  `;
                  await sequelize.query(query, option);
              }
          });
        } catch (error) {
            console.log('ERROR=', error);
        }
        logger.info('-----THE END-----');
    }
};

commander
    .command('addedNewProgramMajor')
    .action(async() => {
        await new AddedNewProgramMajor().start();
    });

exports.Command;

