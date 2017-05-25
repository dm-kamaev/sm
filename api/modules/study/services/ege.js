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
const lodash = require("lodash");
const redis = require('../../../../app/components/redis');
const egeSubjectsOrder = require('../views/constants/egeSubjectsOrder');
const universityEgeSubjectsOrder = require('../views/constants/universityEgeSubjectsOrder');
const subject_1 = require("../models/subject");
const UNIVERSITY_TYPE = 'university';
const EGE_SUBJECTS = 'study.egeSubjects';
const UNIVERSITY_EGE_SUBJECTS = 'study.universityEgeSubjects';
const CACHE_TIME = 60 * 60 * 24;
class EgeService {
    getAllOrdered(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const redisKey = type === UNIVERSITY_TYPE ?
                UNIVERSITY_EGE_SUBJECTS :
                EGE_SUBJECTS;
            let egeSubjects = yield redis.get(redisKey);
            if (!egeSubjects) {
                egeSubjects = yield this.getAllOrderedDb(type);
                redis.set(redisKey, egeSubjects, CACHE_TIME);
            }
            return egeSubjects;
        });
    }
    getAllOrderedDb(subjectsType) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderedSubjects = subjectsType === UNIVERSITY_TYPE ?
                universityEgeSubjectsOrder :
                egeSubjectsOrder;
            const subjects = yield subject_1.Model.findAll();
            return orderedSubjects.map(egeSubjectName => this.findSubjectByName(subjects, egeSubjectName));
        });
    }
    findSubjectByName(subjects, name) {
        return lodash.find(subjects, subject => subject.name === name);
    }
}
exports.egeService = new EgeService();
