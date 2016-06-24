var DataType = require('sequelize');
var db = require('../../../../app/components/db');
const searchType = require('../enums/searchType');

var SchoolSearchData = db.define('SchoolSearchData', {
    schoolId: {
        type: DataType.INTEGER,
        field: 'school_id'
    },
    values: {
        type: DataType.ARRAY(DataType.INTEGER)
    },
    type: {
        type: DataType.ENUM,
        values: searchType.toArray()
    }
}, {
    underscored: true,
    tableName: 'school_search_data',
    classMethods: {
        associate: function(models) {
            SchoolSearchData.belongsTo(models.School, {
                as: 'school', foreignKey: 'school_id'
            });
        }
    }
});

module.exports = SchoolSearchData;
