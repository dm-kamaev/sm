var DataType = require('sequelize'),
    db = require.main.require('./app/components/db');

var OlimpResult = db.define('OlimpResult', {
    type: {
        type: DataType.ENUM,
        values: ['всероссийская', 'московская'],
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
    tableName: 'gia_result',
    classMethods: {
        associate: function (models) {
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
