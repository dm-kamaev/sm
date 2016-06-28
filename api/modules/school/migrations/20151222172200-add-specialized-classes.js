'use strict';

module.exports = {
    up: function(db, DataType) {
        return db.addColumn(
        'school',
        'specialized_classes',
        DataType.ARRAY(DataType.ARRAY(DataType.STRING))
    );
    },

    down: function(db, DataType) {
        return db.removeColumn('school', 'specialized_classes');
    }
};
