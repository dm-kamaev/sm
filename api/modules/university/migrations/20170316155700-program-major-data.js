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
const path_1 = require("path");
const Archiver = require('../../console/modules/modelArchiver/Archiver');
const TABLE_NAME = 'program_major';
const DELIMITER = ',';
const FILE_PATH = 'api/modules/university/migrations';
const FILE_NAME = '20170316155700-program-major-data.tar.gz';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            const dir = path_1.join(__dirname, '../../', FILE_PATH);
            const filePath = path_1.join(dir, FILE_NAME);
            const archiver = new Archiver(filePath);
            yield archiver.fillTable(TABLE_NAME, DELIMITER);
        });
    },
    down: function (queryInterface, Sequelize) {
        return; // it's data migration, you can't rollback it
    }
};
