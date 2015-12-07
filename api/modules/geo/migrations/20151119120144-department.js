'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('department', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: Sequelize.STRING,
        stage: { // 'Дошкольное образование', 'Начальное образование', 'Основное и среднее', 'Дополнительное  образование', 'Профессиональное образование'
            type: Sequelize.ENUM,
            values: ['Дошкольное образование', 'Начальное образование', 'Основное и среднее', 'Дополнительное образование', 'Профессиональное образование']
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
     });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('department');
  }
};
