var DataType = require('sequelize'),
    db = require.main.require('./app/components/db');

var OlimpResult = db.define('OlimpResult', {
    type: {
        type: Datatype.ENUM,
        values: ['всероссийская', 'московская'],
    },
    stage: {
        type: Datatype.INTEGER
    },
    class: {
        type: Datatype.INTEGER
    },
    status: {
        type: Datatype.ENUM,
        values: ['победитель', 'призер']
    },
    year: {
        type: Datatype.INTEGER
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
