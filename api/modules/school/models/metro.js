var DataType = require('sequelize'),
    db = require.main.require('./app/components/db');

var Metro = db.define('Metro', {
    name: DataType.STRING,
    coords: DataType.ARRAY(DataType.FLOAT)
}, {
    underscored: true,
    tableName: 'metro',
    classMethods: {
        associate: function (models) {
            Metro.belongsTo(models.Address, {
                foreignKey: 'address_id'
            });
        }
    }
});

module.exports = Metro;
