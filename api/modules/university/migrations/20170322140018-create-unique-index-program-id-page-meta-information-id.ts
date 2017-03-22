module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.sequelize.query(`
            CREATE UNIQUE INDEX
                program_id_page_meta_information_id_uidx
            ON program_page_meta_information
                (program_id, page_meta_information_id);
        `);
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.sequelize.query(`
            DROP INDEX program_id_page_meta_information_id_uidx
        `);
    }
};
