'use strict';

module.exports = {
  up: function(db, DataType) {
    return db.addColumn(
        'school',
        'dress_code',
        DataType.BOOLEAN
    );
  },

  down: function (db, DataType) {
      return db.removeColumn('school', 'dress_code');
  }
};
