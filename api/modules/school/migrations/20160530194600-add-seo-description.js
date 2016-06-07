'use strict';

const await = require('asyncawait/await');
const async = require('asyncawait/async');


module.exports = {
  up: async(function(db, DataType) {
      try {
          await(db.addColumn(
              'school',
              'seo_description',
              DataType.STRING(300)
          ));
      }
      catch(error) {
      }
  }),

  down: async(function (db, DataType) {
      return await(db.removeColumn('school', 'seo_description'));
  })
};
