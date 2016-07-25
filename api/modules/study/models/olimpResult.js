var DataType = require('sequelize'),
    db = require('../../../../app/components/db');

var OlimpResult = db.define('OlimpResult', {
    schoolId: {
        type: DataType.INTEGER,
        field: 'school_id'
    },
    subjectId: {
        type: DataType.INTEGER,
        field: 'subject_id'
    },
    type: {
        type: DataType.ENUM,
        values: ['всероссийская', 'московская']
    },
    stage: {
        type: DataType.INTEGER
    },
    class: {
        type: DataType.INTEGER
    },
    status: {
        type: DataType.ENUM,
        values: ['победитель', 'призер']
    },
    year: {
        type: DataType.INTEGER
    },
}, {
    underscored: true,
    tableName: 'olimp_result',
    classMethods: {
        associate: function(models) {
            OlimpResult.belongsTo(models.School, {
                foreignKey: 'school_id'
            });
            OlimpResult.belongsTo(models.Subject, {
                foreignKey: 'subject_id',
                as: 'subject'
            });
        }
    }
});

module.exports = OlimpResult;
