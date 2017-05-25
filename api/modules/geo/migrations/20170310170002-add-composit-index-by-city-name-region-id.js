'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.sequelize.query(`
            CREATE UNIQUE INDEX city_name_region_id_uidx
            ON city (name, region_id);
        `);
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.sequelize.query(`
            DROP INDEX city_name_region_id_uidx;
        `);
    }
};
