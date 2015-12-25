var DataType = require('sequelize'),
    db = require('../../../../app/components/db');

var CityResult = db.define('CityResult', {
    giaResult : {
        type: DataType.FLOAT,
        field: 'gia_result'
    },
    egeResult : {
        type: DataType.FLOAT,
        field: 'ege_result'
    },
    cityId : {
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
        associate: function (models) {
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
