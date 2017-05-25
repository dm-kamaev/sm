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
// node commander.js addedNewSubject
// add new subject
const commander = require("commander");
const logger = require('../app/components/logger/logger.js').getLogger('app');
const sequelize = require('../app/components/db.js');
const services = require('../app/components/services').all;
class AddedNewSubject {
    constructor() { }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info('-----START-----');
            const newSubjects = [
                'Информатика и ИКТ',
                'Иностранный язык',
            ];
            try {
                const option = { type: sequelize.QueryTypes.SELECT };
                newSubjects.forEach((displayName) => __awaiter(this, void 0, void 0, function* () {
                    const query = `
              SELECT id FROM subject WHERE display_name='${displayName}'
              `;
                    try {
                        const subject = yield sequelize.query(query, option);
                        if (!subject.length) {
                            yield services.subject.create({
                                name: displayName.toLowerCase(),
                                displayName: displayName,
                                alias: services.urls.stringToURL(displayName),
                            });
                        }
                    }
                    catch (error) {
                        console.log('error=', error);
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
    .command('addedNewSubject')
    .action(() => __awaiter(this, void 0, void 0, function* () {
    yield new AddedNewSubject().start();
}));
exports.Command;
