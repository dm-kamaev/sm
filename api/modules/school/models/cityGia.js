var DataType = require('sequelize'),
    db = require.main.require('./app/components/db');

var CityGia = db.define('CityGia', {
    giaResult : {
        type: DataType.FLOAT,
        field: 'gia_result'
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
    tableName: 'city_gia',
    classMethods: {
        associate: function (models) {
            CityGia.belongsTo(models.Subject, {
                foreignKey: 'subject_id',
                as: 'subject'
            });
            CityGia.belongsTo(models.City, {
                foreignKey: 'city_id'
            });
            
        }
    }
});

module.exports = CityGia;
