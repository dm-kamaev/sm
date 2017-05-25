"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require('../../app/components/logger/logger.js')
    .getLogger('app');
const sequelize = require('../../app/components/db.js');
const SUBJECT = 'Иностранный язык';
const SUBJECT_ALIAS = 'foreign-lang';
class SubjectAdder {
    constructor(subjectName, subjectAlias) {
        this.subjectName = subjectName;
        this.subjectAlias = subjectAlias;
    }
    addIfNotExist() {
        return __awaiter(this, void 0, void 0, function* () {
            const option = { type: sequelize.QueryTypes.SELECT };
            let query = `SELECT id FROM subject
    WHERE display_name = '${this.subjectName}' LIMIT 1`;
            const foundSubjects = yield sequelize.query(query, option);
            if (!foundSubjects.length) {
                query = `INSERT INTO subject
    VALUES (
        DEFAULT,
        '${this.subjectName.toLowerCase()}',
        '${this.subjectName}',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP,
        '${this.subjectAlias}'
    );`;
                yield sequelize.query(query, option);
                logger.info(`${this.subjectName} added`);
            }
        });
    }
}
exports.SubjectAdder = SubjectAdder;
if (!module.parent) {
    (() => __awaiter(this, void 0, void 0, function* () {
        const foreignLangAdder = new SubjectAdder(SUBJECT, SUBJECT_ALIAS);
        yield foreignLangAdder.addIfNotExist();
    }))();
}
