var DataType = require('sequelize'),
    db = require('../../../../app/components/db');

var CityResult = db.define('CityResult', {
    result: {
        type: DataType.FLOAT,
        field: 'result'
    },
    type: {
        type: DataType.ENUM,
        values: ['gia', 'ege']
    },
    year: {
        type: DataType.INTEGER
    },
    cityId: {
        type: DataType.INTEGER,
        field: 'city_id'
    },
    subjectId: {
        type: DataType.INTEGER,
        field: 'subject_id'
    }

}, {
    underscored: true,
    tableName: 'city_result',
    classMethods: {
        associate: function(models) {
            CityResult.belongsTo(models.Subject, {
                foreignKey: 'subject_id',
                as: 'subject'
            });
            CityResult.belongsTo(models.City, {
                foreignKey: 'city_id'
            });
        }
    }
});

module.exports = CityResult;
