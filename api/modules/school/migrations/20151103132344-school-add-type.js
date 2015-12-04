'use strict';
var schoolType = require('../../api/modules/school/enums/schoolType');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('school', 'school_type',
    {
        type: Sequelize.ENUM,
        values: schoolType.toArray(), 
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
