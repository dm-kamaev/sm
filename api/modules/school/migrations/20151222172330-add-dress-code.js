'use strict';

module.exports = {
  up: function(db, DataType) {
    return db.addColumn(
        'school',
        'dress_code',
        DataType.STRING
    );
  },

  down: function (db, DataType) {
      return db.removeColumn('school', 'dress_code');
  }
};
