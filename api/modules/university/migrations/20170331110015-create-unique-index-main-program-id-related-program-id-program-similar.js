module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.sequelize.query(`
            CREATE UNIQUE INDEX
                main_program_id_related_program_id_uidx
            ON program_similar
                (main_program_id, related_program_id);
        `);
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.sequelize.query(`
            DROP INDEX main_program_id_related_program_id_uidx
        `);
    }
};
