var DataType = require('sequelize'),
    userType = require('../enums/userType');
var db = require('../../../../app/components/db');

var UserData = db.define('UserData', {
    userType: {
        field: 'user_type',
        type: DataType.ENUM,
        values: userType.toArray()
    },
    classType: {
        type: DataType.INTEGER,
        field: 'class_type'
    },
    yearGraduate: {
        type: DataType.INTEGER,
        field: 'year_graduate'
    }
}, {
    underscored: true,
    tableName: 'user_data',
    classMethods: {
        associate: function (models) {
            UserData.belongsTo(models.Comment, {
                foreignKey: 'user_data_id'
            });
            UserData.belongsTo(models.Rating, {
                foreignKey: 'user_data_id'
            });
        }
    }
});

module.exports = UserData;

