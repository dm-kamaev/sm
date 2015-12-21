var DataType = require('sequelize'),
    db = require.main.require('./app/components/db');

var Area = db.define('Area', {
    name: DataType.STRING
}, {
    underscored: true,
    tableName: 'area',

    classMethods: {
        associate: function(models) {
            Area.hasMany(models.Address, {
                as: 'adress',
                foreignKey: 'area_id'
            });
        }
    }
});

module.exports = Area;