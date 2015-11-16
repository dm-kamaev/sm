'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('school', 'school_type',
    {
        type: Sequelize.ENUM,//('Школа', 'Лицей', 'Гимназия', 'Центр образования', 'Коррекционная школа', 'Коррекционная школа-интернат', 'Кадетская школа-интернат', 'Кадетская школа'),
        values: ['Школа', 'Лицей', 'Гимназия', 'Центр образования', 'Коррекционная школа', 'Коррекционная школа-интернат', 'Кадетская школа-интернат', 'Кадетская школа'],
        //allowNull: false
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropColumn(
        'school',
        'school_type'
    )
  }
};
