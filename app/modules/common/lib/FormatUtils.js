"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FormatUtils {
    /**
     * Cut text before given symbol.
     * Search last symbol when slicing, and slices to it position.
     * param symbol - symbol before cut
     * param includeLast - is text include given symbol
     */
    cutText(text, maxLength, symbol, includeLast) {
        let result;
        const lastSymbol = includeLast ? 1 : 0;
        if (text.length > maxLength) {
            const lastDotIndex = text.substr(0, maxLength).lastIndexOf(symbol);
            result = text.slice(0, lastDotIndex + lastSymbol);
        }
        return result || text;
    }
    ;
    /**
     * Transform any type value to array
     */
    transformToArray(value) {
        let result = [];
        if (value) {
            switch (typeof value) {
                case 'number':
                    result = this.transformNumberToArray(value);
                    break;
                case 'string':
                    result = this.transformStringToArray(value);
                    break;
                case 'object':
                    result = this.transformObjectToArray(value);
                    break;
            }
        }
        return result;
    }
    ;
    transformStringToArray(value) {
        return value.split(',');
    }
    ;
    transformNumberToArray(value) {
        return [value];
    }
    ;
    transformObjectToArray(value) {
        let result = [];
        if (Array.isArray(value)) {
            result = value;
        }
        return result;
    }
    ;
    /**
     * Return word with right ending
     */
    declensionPrint(count, declensionForms) {
        const num = Math.abs(count);
        let word = '';
        if (num.toString().indexOf('.') > -1) {
            word = declensionForms.gen;
        }
        else {
            word = (num % 10 == 1 && num % 100 != 11) ?
                declensionForms.nom :
                (num % 10 >= 2 &&
                    num % 10 <= 4 &&
                    (num % 100 < 10 || num % 100 >= 20)) ?
                    declensionForms.gen : declensionForms.plu;
        }
        return word;
    }
    ;
    /**
     * Get formatted cut name
     */
    getFormattedCutName(name, maxLength) {
        return this.cutText(name, maxLength, ' ')
            .replace(/\"/g, '')
            .replace(/\sи(?=$)/i, '')
            .concat('...');
    }
}
exports.FormatUtils = FormatUtils;
