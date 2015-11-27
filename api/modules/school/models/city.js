var DataType = require('sequelize'),
    db = require.main.require('./app/components/db');

var City = db.define('City', {
    name: DataType.STRING,
}, {
    underscored: true,
    tableName: 'city',
    classMethods: {
        associate: function (models) {
            City.hasMany(models.School, {
                as: 'schools',
                foreignKey: 'city_id'
            });
            City.hasMany(models.CityGia, {
                as: 'cityGia',
                foreignKey: 'city_id'
            });
        }
    }
});

module.exports = City;
