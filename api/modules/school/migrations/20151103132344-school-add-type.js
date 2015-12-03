'use strict';
var enums = require('../enums');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('school', 'school_type',
    {
        type: Sequelize.ENUM,
        values: enums.schoolType.toArray(), 
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
