"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require('../../app/components/logger/logger.js').getLogger('app');
exports.promiseMethods = {};
exports.promiseMethods.queue = function (createPromise, data) {
    let start = Promise.resolve();
    // stupid linter !!!! for let i in circle
    /* tslint:disable */
    for (let i = 0, l = data.length; i < l; i++) {
        /* tslint:enable */
        start = start.then(function () {
            return __awaiter(this, void 0, void 0, function* () {
                return yield createPromise(data[i]);
            });
        });
    }
    // start.catch(e => logger.critical(e));
    return start;
};
