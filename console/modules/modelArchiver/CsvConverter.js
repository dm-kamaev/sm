'use strict';
const csv2json = require('csvtojson').Converter;
const json2csv = require('json2csv');
const await = require('asyncawait/await');
const replace = require('tipograph').Replace;
const languages = require('tipograph').Languages;
const lodash = require('lodash');

class CsvConverter {
    /**
     * @public
     * @param {string}
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
     * @param
     * @param {object}
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
                    if (newValue)
                        this.cureQuotes(newValue);
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
     * @public
     * @param {string||object} input - JSON or CSV
     */
    constructor(input) {
        this.input_ = input;
        this.type_ = typeof input;
    }

    /**
     * @public
     * @return {object};
     */
    toJson() {
        var unstableJSON = await(this.jsonPromise_(this.input_));
        this.stabilizeJSON_(unstableJSON);

        // TODO: find a normal way to do it
        CsvConverter.cureQuotes(unstableJSON);

        return this.replaceEscape_(unstableJSON);
    }


    /**
     * @public
     * @param {string=} opt_delimiter
     * @return {string}
     */
    toCsv(opt_delimiter) {
        var json = this.getJson_();
        return await(this.csvPromise_(json, opt_delimiter));
    }

    /**
     * @private
     * @return {object}
     */
    getJson_() {
        var res = (this.type_ == 'object') ?
            this.input_ :
            JSON.parse(this.input_);

        CsvConverter.cureQuotes(res);

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
            }
            else if (lodash.isPlainObject(value)) {
                this.stabilizeJSON_(value);
            }
        });
    }

    /**
     * @private
     * @param {string} csv
     * @return {promise<string>}
     */
    jsonPromise_(csv) {
        return new Promise(function(resolve, reject) {
            var converter = new csv2json({});
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
     * @return {promise<string>}
     */
    csvPromise_(json, opt_delimiter) {
        return new Promise (function(resolve, reject) {
            json2csv({
                data: json,
                del: opt_delimiter || ','
            }, function(err, csv) {
                if (err)
                    reject(err);
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
