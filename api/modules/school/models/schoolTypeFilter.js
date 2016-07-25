var DataType = require('sequelize'),
    db = require('../../../../app/components/db');
const searchType = require('../enums/searchType');

var SchoolTypeFilter = db.define('SchoolTypeFilter', {
    name: {
        type: DataType.STRING,
    },
    values: {
        type: DataType.ARRAY(DataType.STRING),
        values: searchType.toArray()
    },
    alias: {
        type: DataType.STRING
    }
}, {
    underscored: true,
    tableName: 'school_type_filter'
});

module.exports = SchoolTypeFilter;
