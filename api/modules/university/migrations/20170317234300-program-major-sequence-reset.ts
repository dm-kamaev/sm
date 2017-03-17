'use strict';

const TABLE_NAME = 'program_major';

module.exports = {
    up: async function(queryInterface, Sequelize) {
        let query = `ALTER SEQUENCE ${TABLE_NAME}_id_seq RESTART;`;
        query += `UPDATE ${TABLE_NAME} SET id = DEFAULT;`;
        return queryInterface.sequelize.query(query);
    },
    down: function(queryInterface, Sequelize) {
        const query = `ALTER SEQUENCE ${TABLE_NAME}_id_seq RESTART;`;
        return queryInterface.sequelize.query(query);
    }
};
