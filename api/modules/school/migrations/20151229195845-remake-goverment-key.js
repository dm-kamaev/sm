'use strict';

module.exports = {
    up: function(db, DataType) {
        return db.changeColumn(
        'school',
        'govermentKey',
            {
                field: 'goverment_key',
                type: DataType.INTEGER,
                unique: false,
                allowNull: true
            }
    );
    },

    down: function(db, DataType) {
        return db.changeColumn(
        'school',
        'govermentKey',
            {
                field: 'goverment_key',
                type: DataType.INTEGER,
                unique: true,
                allowNull: false
            }
    );
    }
};
