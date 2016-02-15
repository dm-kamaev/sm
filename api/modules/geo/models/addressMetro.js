var DataType = require('sequelize'),
    db = require('../../../../app/components/db');

var AddressMetro = db.define('AddressMetro', {
    metroId: {
        type: DataType.INTEGER,
        field: 'metro_id'
    },
    addressId: {
        type: DataType.INTEGER,
        field: 'address_id'
    },
    distance: {
        type: DataType.INTEGER,
        field: 'distance'
    }
}, {
    underscored: true,
    tableName: 'address_metro',
    classMethods: {
        associate: function (models) {
            AddressMetro.belongsTo(models.Address, {
                foreignKey: 'address_id'
            });
            AddressMetro.belongsTo(models.Metro, {
                as: 'metroStation',
                foreignKey: 'metro_id'
            });
        }
    }
});

module.exports = AddressMetro;
