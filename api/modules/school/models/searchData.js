var DataType = require('sequelize'),
    db = require.main.require('./app/components/db');

var SearchData = db.define('SearchData', {
    schoolId: {
        type: DataType.INTEGER,
        field: 'school_id'
    },
    values: {
        type: DataType.ARRAY(DataType.INTEGER)
    },
    type: {
        type: DataType.ENUM,
        values: ['gia','ege'] //TODO: move to separated module
    }
}, {
    underscored: true,
    tableName: 'search_data',
    classMethods: {
        associate: function (models) {
            SearchData.belongsTo(models.School, {
                as: 'school', foreignKey: 'school_id'
            });
        }
    }
});

module.exports = SearchData;
