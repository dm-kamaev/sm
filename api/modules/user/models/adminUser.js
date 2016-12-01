var DataType = require('sequelize'),
    userType = require('../enums/userType');
var db = require('../../../../app/components/db');

var AdminUser = db.define('AdminUser', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER,
    },
    userId: {
        allowNull: false,
        unique: true,
        type: DataType.INTEGER,
    },
    attributes: {
        type: DataType.JSONB,
    },
    'created_at': {
        allowNull: false,
        type: DataType.DATE
    },
    'updated_at': {
        allowNull: false,
        type: DataType.DATE
    },
    'deleted_at': {
        type: DataType.DATE
    }
}, {
    underscored: true,
    tableName: 'admin_user',
    classMethods: {
        associate: function(models) {

        }
    }
});

module.exports = AdminUser;
