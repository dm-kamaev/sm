
// author: dm-kamaev
// base method for parse program xslx

import {Hash} from './types/updateUniverstyAndProgram';

export abstract class BaseWorkWithProgram {

  protected uniteAbbrevationAndName(
    abbreviation: string,
    name: string
  ): string {
      return this.cleanWhiteSpace(abbreviation) +
             '::::' +
             this.cleanWhiteSpace(name);
  }

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
}