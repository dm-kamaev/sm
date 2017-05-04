module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.sequelize.query(`
            CREATE UNIQUE INDEX
                program_id_subject_id_uidx
            ON program_ege_exam
                (program_id, subject_id);
        `);
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.sequelize.query(`
            DROP INDEX program_id_subject_id_uidx
        `);
    }
};
