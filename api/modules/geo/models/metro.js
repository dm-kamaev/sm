
var DataType = require('sequelize'),
    db = require('../../../../app/components/db');

var Metro = db.define('Metro', {
    name: DataType.STRING,
    coords: DataType.ARRAY(DataType.FLOAT)
}, {
    underscored: true,
    tableName: 'metro',
    classMethods: {
        associate: function(models) {
            Metro.belongsToMany(models.Address, {
                as: 'addressesNear',
                through: 'address_metro',
                foreignKey: 'metro_id'
            });
        }
    }
});

module.exports = Metro;
