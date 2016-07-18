var DataType = require('sequelize');
var db = require('../../../../app/components/db');
const searchType = require('../enums/searchType');

var SearchData = db.define('SearchData', {
    schoolId: {
        type: DataType.INTEGER,
        field: 'school_id'
    },
    values: {
        type: DataType.ARRAY(DataType.INTEGER)
    },
    type: {
        type: DataType.STRING,
        validate: {
            isIn: [searchType.toArray()]
        }
    }
}, {
    underscored: true,
    tableName: 'search_data',
    classMethods: {
        associate: function(models) {
            SearchData.belongsTo(models.School, {
                as: 'school', foreignKey: 'school_id'
            });
        }
    }
});

module.exports = SearchData;
