var DataType = require('sequelize'),
    db = require.main.require('./app/components/db');

var GiaResults = db.define('GiaResults', {
    count: {
        type: DataType.INTEGER,
        allowNull: false
    },
    result: {
        type: DataType.FLOAT,
        allowNull: false
    }
}, {
    underscored: true,
    tableName: 'gia_results',
    classMethods: {
        associate: function (models) {
            GiaResults.belongsTo(models.School, {
                foreignKey: 'school_id'
            });
            GiaResults.belongsTo(models.Subject, {
                foreignKey: 'subject_id'
            });
        }
    }
});

module.exports = GiaResults;
