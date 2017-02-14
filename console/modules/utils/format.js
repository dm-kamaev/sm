'use strict';

/**
 * Data formatting unification
 */
class Format {
    /**
     * Url string formating
     * @param {string} str - url string before formatting
     * @return {string} url string after formating
     */
    static url(str) {
        var res = Format.normalizeStr(str);

        res = res
            .replace(/^.+:\/\//, '')
            .replace(/\/+$/, '');

        return res;
    }

    /**
     * Phone string formating
     * @param {string} str - phone string before formatting
     * @return {string} phone string after formating
     */
    static phone(str) {
        var res = Format.normalizeStr(str, {
            collapseSpaces: true
        });

        res = res.replace(/^.+\(/, '(');
        res = res.replace(/\)(.)/, function(match, symbol) {
            return ') ' + symbol.trim();
        });
        res = res.replace(/[−-]/g, '');
        res = res.replace(/(\d)/g, function(match, symbol, index) {
            return (index == 9 || index == 11) ? '-' + symbol : symbol;
        });

        return res;
    }

    /**
     * String normalization
     * @param {string} str - String to normalize
     * @param {object} [opt_options] Normalization options
     * @param {boolean} [opt_options.trim=true] Trimming
     * @param {boolean} [opt_options.fixQuotes=true] Replacement "" with «»
     * @param {boolean} [opt_options.capitalize=false] Capitalize first char
     * @param {boolean} [opt_options.collapseSpaces=false] 2 and more spaces
     *                                                     collapsed to 1
     * @return {string} Normalized string
     */
    static normalizeStr(str, opt_options) {
        var res = str || '',
            settings = {
                trim: true,
                fixQuotes: true,
                capitalize: false,
                collapseSpaces: false
            };

        Object.assign(settings, opt_options);

        Object.keys(settings)
            .forEach(option => {
                if (settings[option]) {
                    var convertationFunction = Format[option];
                    res = convertationFunction(res);
                }
            });

        return res;
    }

    /**
     * Trimming
     * @param {string} str Input string
     * @return {string} Result string
     */
    static trim(str) {
        return str.trim();
    }

    /**
     * Replacement "" with «»
     * @param {string} str Input string
     * @return {string} Result string
     */
    static fixQuotes(str) {
        return str.replace(/[«»]/g, '"').replace(/"([^"]*)"/g, '«$1»');
    }

    /**
     * 2 and more spaces collapsed to 1
     * @param {string} str Input string
     * @return {string} Result string
     */
    static collapseSpaces(str) {
        return str.replace(/\s+/g, ' ');
    }

    /**
     * Capitalize first char
     * @param {string} str Input string
     * @return {string} Result string
     */
    static capitalize(str) {
        str = str.trim();
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Transform given array to string in postgres Array format
     * please note, that array to place in db can consist only of
     * another arrays or simple types
     * @param {Array<*>} array
     * @return {string}
     */
    static prepareArrayForDb(array) {
        return JSON.stringify(array)
            .replace(/\[/g, '{')
            .replace(/]/g, '}');
    }
}

module.exports = Format;
