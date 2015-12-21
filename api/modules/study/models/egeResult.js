var DataType = require('sequelize'),
    db = require.main.require('./app/components/db');

var EgeResult = db.define('EgeResult', {
    schoolId: {
        type: DataType.INTEGER,
        field: 'school_id'
    },
    subjectId: {
        type: DataType.INTEGER,
        field: 'subject_id'
    },
    year: {
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
    tableName: 'ege_result',
    classMethods: {
        associate: function (models) {
            EgeResult.belongsTo(models.School, {
                foreignKey: 'school_id'
            });
            EgeResult.belongsTo(models.Subject, {
                foreignKey: 'subject_id',
                as: 'subject'
            });
        }
    }
});

module.exports = EgeResult;
