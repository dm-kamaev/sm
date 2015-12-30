'use strict';

module.exports = {
  up: function(db, DataType) {
    return db.addColumn(
        'school',
        'boarding',
        DataType.BOOLEAN
    );
  },

  down: function (db, DataType) {
      return db.removeColumn('school','boarding');
  }
};
