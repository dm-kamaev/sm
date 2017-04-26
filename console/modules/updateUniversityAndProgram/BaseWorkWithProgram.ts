
// author: dm-kamaev
// base method for parse program xslx

import {Hash} from './types/updateUniverstyAndProgram';

export abstract class BaseWorkWithProgram {

    protected cleanWhiteSpace(str: string): string {
        str = str || '';
        return str.replace(/\s+/g, ' ').trim();
    }

    protected russianBooleanToEnglish(russianBoolean: string): boolean | null {
        russianBoolean = russianBoolean || '';
        russianBoolean = russianBoolean.replace(/[\s!-/:-@[-`{-~]/g, '')
            .toLowerCase();
        const englishBoolean: Hash<boolean> = {
            'да': true,
            'нет': false
        };
        let res = null;
        if (
            englishBoolean[russianBoolean] === true ||
            englishBoolean[russianBoolean] === false
        ) {
            res = englishBoolean[russianBoolean];
        }
        return res;
    }

    protected uniteAbbrevationAndName(
      abbreviation: string,
      name: string
    ): string {
        return this.cleanWhiteSpace(abbreviation) +
               '::::' +
               this.cleanWhiteSpace(name);
    }


    protected uniteUniversityIdAndProgramName(
      universityId: number,
      programName: string
    ): string {
      return this.cleanWhiteSpace(String(universityId)) +
             '::::' +
             this.cleanWhiteSpace(programName);
    }


    protected uniteProgramIdAndYear(
      programId: number,
      year: number
    ): string {
      return this.cleanWhiteSpace(String(programId)) +
             '::::' +
             this.cleanWhiteSpace(String(year));
    }

    protected uniteProgramIdAndSubjectId(
      programId: number,
      subjectId: number
    ): string {
      return this.cleanWhiteSpace(String(programId)) +
             '::::' +
             this.cleanWhiteSpace(String(subjectId));
    }
}