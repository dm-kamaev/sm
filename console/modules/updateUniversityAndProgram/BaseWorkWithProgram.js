"use strict";
// author: dm-kamaev
// base method for parse program xslx
Object.defineProperty(exports, "__esModule", { value: true });
class BaseWorkWithProgram {
    cleanWhiteSpace(str) {
        str = str || '';
        return str.replace(/\s+/g, ' ').trim();
    }
    russianBooleanToEnglish(russianBoolean) {
        russianBoolean = russianBoolean || '';
        russianBoolean = russianBoolean.replace(/[\s!-/:-@[-`{-~]/g, '')
            .toLowerCase();
        const englishBoolean = {
            'да': true,
            'нет': false
        };
        let res = null;
        if (englishBoolean[russianBoolean] === true ||
            englishBoolean[russianBoolean] === false) {
            res = englishBoolean[russianBoolean];
        }
        return res;
    }
    uniteAbbrevationAndName(abbreviation, name) {
        return this.cleanWhiteSpace(abbreviation) +
            '::::' +
            this.cleanWhiteSpace(name);
    }
    uniteUniversityIdAndProgramName(universityId, programName) {
        return this.cleanWhiteSpace(String(universityId)) +
            '::::' +
            this.cleanWhiteSpace(programName);
    }
    uniteProgramIdAndYear(programId, year) {
        return this.cleanWhiteSpace(String(programId)) +
            '::::' +
            this.cleanWhiteSpace(String(year));
    }
    uniteProgramIdAndSubjectId(programId, subjectId) {
        return this.cleanWhiteSpace(String(programId)) +
            '::::' +
            this.cleanWhiteSpace(String(subjectId));
    }
    uniteUniversityNameAndProgramName(universityName, programName) {
        return this.cleanWhiteSpace(universityName) +
            '::::' +
            this.cleanWhiteSpace(programName);
    }
}
exports.BaseWorkWithProgram = BaseWorkWithProgram;
