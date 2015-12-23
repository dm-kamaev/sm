var DataType = require('sequelize'),
    db = require('../../../../app/components/db');

var GiaResult = db.define('GiaResult', {
    count: {
        type: DataType.INTEGER,
        allowNull: false
    },
    subjectId: {
        type: DataType.INTEGER,
        field: 'subject_id'
    },
    result: {
        type: DataType.FLOAT,
        allowNull: false
    }
}, {
    underscored: true,
    tableName: 'gia_result',
    classMethods: {
        associate: function (models) {
            GiaResult.belongsTo(models.School, {
                foreignKey: 'school_id'
            });
            GiaResult.belongsTo(models.Subject, {
                foreignKey: 'subject_id',
                as: 'subject'
            });
        }
    }
});

module.exports = GiaResult;
