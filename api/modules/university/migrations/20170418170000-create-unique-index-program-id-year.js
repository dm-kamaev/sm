module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.sequelize.query(`
            CREATE UNIQUE INDEX
                program_id_year_uidx
            ON entrance_statistic
                (program_id, year);
        `);
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.sequelize.query(`
            DROP INDEX program_id_year_uidx
        `);
    }
};
