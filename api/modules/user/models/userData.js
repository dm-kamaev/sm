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
    },
    userId: {
        field: 'user_id',
        type: DataType.INTEGER
    },
    key: {
        field: 'key',
        type: DataType.STRING
    },
    username: {
        field: 'username',
        type: DataType.STRING
    },
    kidGrade: {
        field: 'kid_grade',
        type: DataType.INTEGER
    },
    pupilGrade: {
        field: 'pupil_grade',
        type: DataType.INTEGER
    }
}, {
    underscored: true,
    tableName: 'user_data',
    classMethods: {
        associate: function (models) {
            UserData.hasOne(models.Comment, {
                as: 'userData',
                foreignKey: 'user_data_id'
            });
            UserData.hasOne(models.Rating, {
                as: 'userData',
                foreignKey: 'user_data_id'
            });
        }
    }
});

module.exports = UserData;
