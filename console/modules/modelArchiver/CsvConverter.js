'use strict';
const csv2json = require('csvtojson').Converter;
const json2csv = require('json2csv');
const await = require('asyncawait/await');

class CsvConverter {
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
     * @return {string};
     */
    toJson() {
        return await(this.jsonPromise_(this.input_));
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
        return res;
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

