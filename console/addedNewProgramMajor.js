'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// author: dm-kamaev
// node commander.js addedNewProgramMajor
// add new program major
const commander = require("commander");
const logger = require('../app/components/logger/logger.js').getLogger('app');
const sequelize = require('../app/components/db.js');
class AddedNewProgramMajor {
    constructor() { }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info('-----START-----');
            const newProgramMajor = [
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
                const option = { type: sequelize.QueryTypes.SELECT };
                newProgramMajor.forEach((name) => __awaiter(this, void 0, void 0, function* () {
                    let query = `
              SELECT id FROM program_major WHERE name='${name}'
              `;
                    const programMajor = yield sequelize.query(query, option);
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
                        yield sequelize.query(query, option);
                    }
                }));
            }
            catch (error) {
                console.log('ERROR=', error);
            }
            logger.info('-----THE END-----');
        });
    }
}
;
commander
    .command('addedNewProgramMajor')
    .action(() => __awaiter(this, void 0, void 0, function* () {
    yield new AddedNewProgramMajor().start();
}));
exports.Command;
