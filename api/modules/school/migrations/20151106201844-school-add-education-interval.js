'use strict';

module.exports = {
    up: function (db, DataType) {
        return db.addColumn('school', 'education_interval', {
            type: DataType.ARRAY(DataType.INTEGER)
        });
    },
    down: function (db, DataType) {
        return db.dropColumn('school', 'education_interval')
    }
};
