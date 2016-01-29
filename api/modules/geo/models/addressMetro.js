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
}, {
    underscored: true,
    tableName: 'address_metro',
});

module.exports = AddressMetro;
