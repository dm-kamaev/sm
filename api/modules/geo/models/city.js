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
            City.hasMany(models.CityResult, {
                as: 'cityResult',
                foreignKey: 'city_id'
            });
        }
    }
});

module.exports = City;
