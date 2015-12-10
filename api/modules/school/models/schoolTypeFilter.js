var DataType = require('sequelize'),
    db = require.main.require('./app/components/db'),
    enums = require('../enums');

var SchoolTypeFilter = db.define('SchoolTypeFilter', {
    name: {
        type: DataType.STRING,
    },
    values: {
        type: DataType.ARRAY(DataType.STRING),
        values: enums.searchType.toArray()
    },
}, {
    underscored: true,
    tableName: 'school_type_filter',
});

module.exports = SchoolTypeFilter;
