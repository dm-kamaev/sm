'use strict'
var path = require('path'),
    fs = require('fs');

class Enum {
    /**
     * @public
     * @param {string} name
     * @param {object} fields
     */
    constructor (name, fields) {
        this.name_ = name;
        this.fields_ = fields;
    }

    /**
     * @public
     * @return {string}
     */
    get name() {
        return this.name_;
    }

    /**
     * @public
     * @return {object}
     */
    get fields() {
        return this.fields_;
    }

    /**
     * @public
     * @return {array<string>}
     */
    toArray() {
        var res = [];
        for (var field in this.fields_) {
            res.push(this.fields_[field]);
        }
        return res;
    }

    /**
     * @public
     * @param {string} value
     * @return {?string}
     */
    getPropByValue(value) {
        for (var field in this.fields_) {
            if (this.fields_[field] == value) {
                return field;
            }
        }
        return null;
    }
}
module.exports = Enum;
