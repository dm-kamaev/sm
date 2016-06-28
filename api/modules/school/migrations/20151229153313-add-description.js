'use strict';

module.exports = {
    up: function(db, DataType) {
        return db.addColumn(
        'school',
        'description',
        DataType.STRING
    );
    },

    down: function(db, DataType) {
        return db.removeColumn('school', 'description');
    }
};
