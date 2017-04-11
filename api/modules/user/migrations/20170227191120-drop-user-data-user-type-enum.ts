const userTypeEnum =
    require('../../api/modules/user/enums/userType');
const DB_ENUM_NAME = 'enum_user_data_user_type';
const TABLE = 'user_data';
const COLUMN = 'user_type';

module.exports = {
    up: async function(queryInterface, Sequelize) {
        await queryInterface.changeColumn(TABLE, COLUMN, {
            type: Sequelize.STRING,
        });

        const query = `DROP TYPE ${DB_ENUM_NAME}`;
        return await queryInterface.sequelize.query(query);
    },
    down: async function(queryInterface) {
        const enumValues =
            userTypeEnum.toArray()
                .map(value => '\'' + value + '\'')
                .toString();
        const dropDefaultValueQuery =
                `ALTER TABLE "${TABLE}" ALTER COLUMN "${COLUMN}" DROP DEFAULT;`,
            createTypeQuery = `CREATE TYPE "public"."${DB_ENUM_NAME}" ` +
                ` AS ENUM(${enumValues});`,
            setTypeQuery =
                `ALTER TABLE "${TABLE}" ALTER COLUMN "${COLUMN}" ` +
                `TYPE "public"."${DB_ENUM_NAME}" ` +
                `USING ("${COLUMN}"::"public"."${DB_ENUM_NAME}");`;

        const query = dropDefaultValueQuery + createTypeQuery + setTypeQuery;
        return await queryInterface.sequelize.query(query);
    }
};