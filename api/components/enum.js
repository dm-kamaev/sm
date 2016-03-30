'use strict'
var path = require('path'),
    fs = require('fs'),
    lodash = require('lodash');

class Enum {
    /**
     * @public
     * @param {string} name
     * @param {object} fields
     */
    constructor (name, fields) {
        this.name_ = name;
        this.fields_ = fields;

        /**
         * Fields with values transformed to camel case
         * @type {Object}
         * @private
         */
        this.camelCaseFields_ = null;

        Object.assign(this, fields);
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
     * Get fields with values transformed to camelCase
     * @public
     * @return {Object}
     */
    get camelCaseFields() {
        var fields = this.fields;

        if (!this.camelCaseFields_) {
            this.camelCaseFields_ = lodash.mapValues(fields, this.toCamelCase_);
        }

        return this.camelCaseFields_;
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
     * Return array with enum field values transformed to camel case
     * @public
     * @return {Array.<string>}
     */
    toCamelCaseArray() {
        var fields = this.toArray();

        return fields.map(this.toCamelCase_);
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

    /**
     * Transform given value to camel case
     * @private
     * @param {string} value
     * @return {string}
     */
    toCamelCase_(value) {
        return lodash.camelCase(value);
    }
}
module.exports = Enum;
