var DataType = require('sequelize'),
    db = require.main.require('./app/components/db');

var Search = db.define('Search', {
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
    tableName: 'search',
    classMethods: {
        associate: function (models) {
            Search.belongsTo(models.School, {
                as: 'school', foreignKey: 'school_id'
            });
        }
    }
});

module.exports = Search;
