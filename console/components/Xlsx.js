"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xlsxj = require("xlsx-to-json");
class Xlsx {
    constructor() {
    }
    getJson(path) {
        return new Promise((resolve, reject) => {
            xlsxj({
                input: path,
                output: null,
            }, function (err, res) {
                if (err) {
                    return reject(err);
                }
                resolve(res);
            });
        });
    }
}
exports.Xlsx = Xlsx;
