module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.sequelize.query(`
            CREATE UNIQUE INDEX
                university_id_page_id_uidx
            ON university_page
                (university_id, page_id);
        `);
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.sequelize.query(`
            DROP INDEX university_id_page_id_uidx
        `);
    }
};
