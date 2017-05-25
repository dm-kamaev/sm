'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander = require('commander');
const logger = require('../app/components/logger/logger.js').getLogger('app');
const city_1 = require("../api/modules/geo/services/city");
const start = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const moscow = yield city_1.service.getByData({
                where: {
                    name: {
                        $ilike: '%москва%'
                    }
                }
            });
            yield city_1.service.update(moscow.id, 'москва');
            logger.info('Success update moscow');
        }
        catch (error) {
            logger.critical(error);
        }
    });
};
commander
    .command('insertRegionForMoscow')
    .action(() => start());
exports.Command;
