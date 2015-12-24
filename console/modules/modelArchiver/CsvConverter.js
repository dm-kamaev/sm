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
        return res;
    }

    /**
     * @private
     * @prama {object} unstableJSON
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

