var DataType = require('sequelize'),
    db = require.main.require('./app/components/db');

var Address = db.define('Address', {
    name: DataType.STRING,
    coords: DataType.ARRAY(DataType.FLOAT),
}, {
    underscored: true,
    tableName: 'address',
    classMethods: {
        associate: function (models) {
            Address.belongsTo(models.School, {
                foreignKey: 'school_id'
            });
            Address.hasMany(models.Metro, {
                as: 'metro_stantions', foreignKey: 'address_id'
            });
        }
    }
});

module.exports = Address;
