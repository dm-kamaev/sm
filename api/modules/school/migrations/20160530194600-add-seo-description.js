'use strict';

module.exports = {
  up: function(db, DataType) {
    return db.addColumn(
        'school',
        'seo_description',
        DataType.STRING(300)
    );
  },

  down: function (db, DataType) {
      return db.removeColumn('school', 'seo_description');
  }
};
