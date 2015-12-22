var DataType = require('sequelize'),
    db = require.main.require('./app/components/db');

var Department_address = db.define('Department_address', {
    address_id: DataType.INTEGER,
    department_id: DataType.INTEGER
}, {
    underscored: true,
    tableName: 'department_address',

    classMethods: {
        associate: function (models) {
        }
    }
});

module.exports = Department_address;