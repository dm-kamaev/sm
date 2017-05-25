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
// node ./console/one-off/getListSkipEge.js
// get list program for which hide ege_pass_score
const fs = require("fs");
const path = require("path");
const logger = require('../../app/components/logger/logger.js').getLogger('app');
const sequelize = require('../../app/components/db.js');
class AddedNewProgramMajor {
    constructor() { }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const option = { type: sequelize.QueryTypes.SELECT };
            let query = `
          SELECT
              p.id,
              p.name,
              p.university_id,
              COUNT(p.id),
              u.name as university_name,
              es.ege_pass_score
          FROM program as p
          LEFT JOIN university as u ON p.university_id = u.id
          LEFT JOIN program_ege_exam as pee ON p.id = pee.program_id
          LEFT JOIN entrance_statistic as es ON p.id = es.program_id
          WHERE es.ege_pass_score <= 150
          GROUP BY
              p.id,
              p.name,
              p.university_id,
              u.name,
              es.ege_pass_score
          HAVING COUNT(p.id)=3
        `;
            const programs = yield sequelize.query(query, option);
            console.log('programs.length=', programs.length);
            const hash = {};
            programs.forEach(program => {
                hash[program.university_name + '::::' + program.name] = program;
            });
            console.log('hash.length=', Object.keys(hash).length);
            const fullPath = path.join(__dirname, '../../assets/universities/skipEge.json');
            fs.writeFileSync(fullPath, JSON.stringify(hash));
        });
    }
}
;
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield new AddedNewProgramMajor().start();
    });
})();
