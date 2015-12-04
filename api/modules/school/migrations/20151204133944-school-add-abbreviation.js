'use strict';

module.exports = {
    up: function (db, DataType) {
        return db.addColumn('school', 'abbreviation', {
            type: DataType.STRING,
        });
    },
    down: function (db, DataType) {
        return db.dropColumn('school', 'abbreviation')
    }
};