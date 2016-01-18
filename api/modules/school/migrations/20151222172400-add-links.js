'use strict';

module.exports = {
  up: function(db, DataType) {
    return db.addColumn(
        'school',
        'links',
        DataType.ARRAY(DataType.ARRAY(DataType.STRING))
    );
  },

  down: function (db, DataType) {
      return db.removeColumn('school', 'links');
  }
};
