'use strict';

const async = require('asyncawait/async');
const await = require('asyncawait/await');

const awardeeStatusEnum =
    require('../../api/modules/study/enums/olimpStatusType');
const DB_ENUM_NAME = 'enum_olimp_result_status';
const TABLE = 'olimp_result';
const COLUMN = 'status';

module.exports = {
    up: async(function(queryInterface, Sequelize) {
        await(queryInterface.changeColumn(TABLE, 'status', {
            type: Sequelize.STRING,
        }));

        let query = `DROP TYPE ${DB_ENUM_NAME}`;
        return await(queryInterface.sequelize.query(query));
    }),
    down: async(function(queryInterface, Sequelize) {
        let enumValues =
            awardeeStatusEnum.toArray()
                .map(value => '\'' + value + '\'')
                .toString();
        let dropDefaultValueQuery =
                `ALTER TABLE "${TABLE}" ALTER COLUMN "${COLUMN}" DROP DEFAULT;`,
            createTypeQuery = `CREATE TYPE "public"."${DB_ENUM_NAME}" ` +
                ` AS ENUM(${enumValues});`,
            setTypeQuery =
                `ALTER TABLE "${TABLE}" ALTER COLUMN "${COLUMN}" ` +
                `TYPE "public"."${DB_ENUM_NAME}"` +
                `USING ("${COLUMN}"::"public"."${DB_ENUM_NAME}");`;

        let query = dropDefaultValueQuery + createTypeQuery + setTypeQuery;
        return await(queryInterface.sequelize.query(query));
    })
};
