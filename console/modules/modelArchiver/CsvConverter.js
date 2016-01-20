'use strict';
const csv2json = require('csvtojson').Converter;
const json2csv = require('json2csv');
const await = require('asyncawait/await');

class CsvConverter {
    /**
     * @public
     * @param {string}
     * @return {string}
     * Thank you javascript for userfull string functions
     */
    static replaceQuotes(str) {
        var result;
        var first = str.indexOf('"');
        var last = str.lastIndexOf('"');
        if (first > -1 && last > -1) {
            result = str;
            var innerSubstring = result.substr(first + 1, last - first - 1);
            result = result.substr(0, first) + '«' + 
                this.replaceQuotes(innerSubstring) + '»' + result.substr(last + 1);
        } else {
            result = str.replace(/\"/g,'«');
        }
        return result;
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
                    newValue = this.replaceQuotes(oldValue);
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
        return unstableJSON;
    }

    
    /**
     * @public
     * @return {string}
     */
    toCsv() {
        var json = this.getJson_();
        return await(this.csvPromise_(json));
    }

    /**
     * @private
     * @return {object}
     */
    getJson_() {
        var res;
        if (this.type_ == 'object') {
            res = this.input_;
        } else {
            res = JSON.parse(this.input_);
        }
        CsvConverter.cureQuotes(res);
        return res;
    }

    /**
     * @private
     * @param {object} unstableJSON
     * used to unflatten arrays
     */
    stabilizeJSON_(unstableJSON) {
        for (var key in unstableJSON) {
            var oldValue = unstableJSON[key];
            try {
                if (typeof oldValue == 'object') {
                    var newValue = Object.assign({}, oldValue);
                    this.stabilizeJSON_(newValue);
                } else {
                    var newValue = JSON.parse(oldValue);
                }
                unstableJSON[key] = newValue;
            } catch (e) {
                unstableJSON[key] = oldValue;
            }
        }
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
     * @return {promise<string>}
     */
    csvPromise_(json) {
        return new Promise (function(resolve, reject) {
            json2csv({ 
                data: json,
            }, function(err, csv) {
                if (err) 
                    reject(err);
                resolve(csv);
            });
        });
    }

}

module.exports = CsvConverter;

