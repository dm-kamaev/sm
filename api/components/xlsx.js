"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xlsxj = require("xlsx-to-json");
exports.xlsx = {};
exports.xlsx.getJson = function (path, options) {
    options = options || {};
    return new Promise((resolve, reject) => {
        xlsxj({
            input: path,
            output: null,
            sheet: options.sheet
        }, function (err, res) {
            if (err) {
                return reject(err);
            }
            resolve(res);
        });
    });
};
