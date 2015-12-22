'use strict';
module.exports = {
    up: function (db, DataType) {
        return db.addColumn('school', 'score', {
            type: DataType.ARRAY(DataType.FLOAT),
        });
    },
    down: function (db, DataType) {
        return db.dropColumn('school', 'score');
    }
};
