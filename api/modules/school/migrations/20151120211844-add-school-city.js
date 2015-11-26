'use strict';

module.exports = {
    up: function (db, DataType) {
        return db.addColumn('school', 'city_id', {
            type: DataType.INTEGER,
            references: {
                 model: "city",
                 key: "id"
            }
        }) 
    },
    down: function (db, DataType) {
        return db.dropColumn('school', 'city_id')
    }
};
