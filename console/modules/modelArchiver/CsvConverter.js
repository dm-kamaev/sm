'use strict';
const Csv2json = require('csvtojson').Converter;
const json2csv = require('json2csv');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const replace = require('tipograph').Replace;
const languages = require('tipograph').Languages;
const lodash = require('lodash');

const CSV_DELIMITER = '|';

class CsvConverter {
    /**
     * @public
     * @param {string} str
     * @return {string}
     * Thank you javascript for userfull string functions
     */
    static beautyfySybmols(str) {
        replace.configure(languages.russian);
        var res = replace.all(str);

        // TODO: find a normal way to do it
        res = res.replace(/−/g, '-');

        return res;
    }

    /**
     * @param {object} JSON
     * used to fix double quotes
     */
    static cureQuotes(JSON) {
        for (var key in JSON) {
            var oldValue = JSON[key];
            try {
                var newValue;
                if (oldValue === null || typeof oldValue === 'undefined') {
                    newValue = null;
                } else if (typeof oldValue == 'object') {
                    if (Array.isArray(oldValue)) {
                        newValue = oldValue.slice(0);
                    } else {
                        newValue = Object.assign({}, oldValue);
                    }
                    if (newValue) { this.cureQuotes(newValue); }
                } else if (typeof oldValue == 'string') {
                    newValue = this.beautyfySybmols(oldValue);
                } else {
                    newValue = oldValue;
                }
                JSON[key] = newValue;
            } catch (e) {
                console.log(e);
                JSON[key] = oldValue;
            }
        }
    }

    /**
     * Create csv from given data
     * @param {Object} data
     * @param {string} opt_csvDelimiter
     * @return {string}
     */
    static createCsv(data, opt_csvDelimiter) {
        var csvDelimiter = opt_csvDelimiter || CSV_DELIMITER,
            csvConverter = new CsvConverter(data);

        return csvConverter.toCsv(
            csvDelimiter,
            {
                notCureQuotes: true
            }
        );
    }

    /**
     * @public
     * @param {string|object} input - JSON or CSV
     */
    constructor(input) {
        this.input_ = input;
        this.type_ = typeof input;
    }

    /**
     * @public
     * @param {{
     *     delimiter: (string|undefined),
     *     headers: (Array<string>|undefined)
     * }=} opt_params
     * @return {object};
     */
    toJson(opt_params) {
        var params = opt_params || {};
        var unstableJSON = await(this.jsonPromise_(
            this.input_,
            params
        ));
        this.stabilizeJSON_(unstableJSON);

        // TODO: find a normal way to do it
        CsvConverter.cureQuotes(unstableJSON);

        return this.replaceEscape_(unstableJSON);
    }


    /**
     * @public
     * @param {string=} opt_delimiter
     * @param {{
     *     notCureQuotes: boolean
     * }=} opt_config
     * @return {string}
     */
    toCsv(opt_delimiter, opt_config) {
        var config = opt_config || {},
            json = this.getJson_(config.notCureQuotes),
            that = this;
        let asyncWrap = async(function(json, opt_delimiter) {
            return await(that.csvPromise_(json, opt_delimiter));
        });
        return asyncWrap(json, opt_delimiter);
    }

    /**
     * @private
     * @param {boolean=} opt_notCureQuotes
     * @return {object}
     */
    getJson_(opt_notCureQuotes) {
        var res = (this.type_ == 'object') ?
            this.input_ :
            JSON.parse(this.input_);

        if (!opt_notCureQuotes) {
            CsvConverter.cureQuotes(res);
        }

        return res;
    }

    /**
     * @private
     * @param {object} unstableJSON
     * used to unflatten arrays
     */
    stabilizeJSON_(unstableJSON) {
        lodash.forIn(unstableJSON, (value, key) => {
            if (value == 'null') {
                unstableJSON[key] = null;
            } else if (lodash.isPlainObject(value)) {
                this.stabilizeJSON_(value);
            }
        });
    }

    /**
     * @private
     * @param {string} csv
     * @param {{
     *     delimiter: (string|undefined),
     *     headers: (string|undefined)
     * }} params
     * @return {promise<string>}
     */
    jsonPromise_(csv, params) {
        return new Promise(function(resolve, reject) {
            var converter = new Csv2json(params);
            converter.fromString(csv, function(err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    /**
     * @private
     * @param {object} json
     * @param {string=} opt_delimiter
     * @return {Promise<string>}
     */
    csvPromise_(json, opt_delimiter) {
        return new Promise(function(resolve, reject) {
            json2csv({
                data: json,
                del: opt_delimiter || ','
            }, function(err, csv) {
                if (err) {
                    reject(err);
                }
                resolve(csv);
            });
        });
    }

    /**
     * @private
     * @param {array<object>} json
     * @return {array<object>}
     */
    replaceEscape_(json) {
        for (var elem in json) {
            for (var prop in json[elem]) {
                json[elem][prop] = typeof json[elem][prop] === 'string' ?
                    json[elem][prop].replace(/\\n/g, '\n') : json[elem][prop];
            }
        }
        return json;
    }
}

module.exports = CsvConverter;
