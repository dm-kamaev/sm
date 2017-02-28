module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.renameColumn('user_data', 'class_type', 'grade');
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.renameColumn('user_data', 'grade', 'class_type');
    }
};
