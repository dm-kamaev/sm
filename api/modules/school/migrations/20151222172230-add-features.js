'use strict';

module.exports = {
    up: function(db, DataType) {
        return db.addColumn(
        'school',
        'features',
        DataType.ARRAY(DataType.STRING)
    );
    },

    down: function(db, DataType) {
        return db.removeColumn('school', 'features');
    }
};
