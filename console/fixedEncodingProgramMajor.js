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
// node commander.js fixedEncodingProgramMajor
// fixed encode problem with letter "й"
const commander = require("commander");
const logger = require('../app/components/logger/logger.js').getLogger('app');
const sequelize = require('../app/components/db.js');
const programMajor_1 = require("../api/modules/university/services/programMajor");
class FixedEncodingProgramMajor {
    constructor() { }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info('-----START-----');
            try {
                const programMajors = yield programMajor_1.service.getAll();
                const programMajorsUpdate = programMajors.map((programMajor) => {
                    let name = programMajor.name;
                    // replace to normal й
                    name = name.replace(/\u0438\u0306/g, 'й');
                    return { id: programMajor.id, name };
                });
                const promises = programMajorsUpdate.map((programMajor) => __awaiter(this, void 0, void 0, function* () {
                    return programMajor_1.service.update(programMajor.id, { name: programMajor.name });
                }));
                yield Promise.all(programMajorsUpdate);
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
    .command('fixedEncodingProgramMajor')
    .action(() => __awaiter(this, void 0, void 0, function* () {
    yield new FixedEncodingProgramMajor().start();
}));
exports.Command;
