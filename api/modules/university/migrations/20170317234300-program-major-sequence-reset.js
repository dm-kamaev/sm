'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const TABLE_NAME = 'program_major';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `ALTER SEQUENCE ${TABLE_NAME}_id_seq RESTART;`;
            query += `UPDATE ${TABLE_NAME} SET id = DEFAULT;`;
            return queryInterface.sequelize.query(query);
        });
    },
    down: function (queryInterface, Sequelize) {
        const query = `ALTER SEQUENCE ${TABLE_NAME}_id_seq RESTART;`;
        return queryInterface.sequelize.query(query);
    }
};
