'use strict';

module.exports = {
  up: function(db, DataType) {
    return db.addColumn(
        'school',
        'extended_day_cost',
        DataType.STRING
    );
  },

  down: function (db, DataType) {
      return db.removeColumn('school', 'extended_day_cost');
  }
};
