'use strict';

module.exports = {
    up: function(db, DataType) {
        return db.addColumn(
        'school',
        'popularity',
        DataType.INTEGER
    );
    },

    down: function(db, DataType) {
        return db.removeColumn('school', 'popularity');
    }
};
