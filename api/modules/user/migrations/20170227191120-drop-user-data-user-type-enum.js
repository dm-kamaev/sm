var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const userTypeEnum = require('../../api/modules/user/enums/userType');
const DB_ENUM_NAME = 'enum_user_data_user_type';
const TABLE = 'user_data';
const COLUMN = 'user_type';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.changeColumn(TABLE, COLUMN, {
                type: Sequelize.STRING,
            });
            const query = `DROP TYPE ${DB_ENUM_NAME}`;
            return yield queryInterface.sequelize.query(query);
        });
    },
    down: function (queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            const enumValues = userTypeEnum.toArray()
                .map(value => '\'' + value + '\'')
                .toString();
            const dropDefaultValueQuery = `ALTER TABLE "${TABLE}" ALTER COLUMN "${COLUMN}" DROP DEFAULT;`, createTypeQuery = `CREATE TYPE "public"."${DB_ENUM_NAME}" ` +
                ` AS ENUM(${enumValues});`, setTypeQuery = `ALTER TABLE "${TABLE}" ALTER COLUMN "${COLUMN}" ` +
                `TYPE "public"."${DB_ENUM_NAME}" ` +
                `USING ("${COLUMN}"::"public"."${DB_ENUM_NAME}");`;
            const query = dropDefaultValueQuery + createTypeQuery + setTypeQuery;
            return yield queryInterface.sequelize.query(query);
        });
    }
};
