var DataType = require('sequelize'),
    db = require.main.require('./app/components/db');

var Subject = db.define('Subject', {
    name: {
        type: DataType.STRING,
        unique: true
    }
}, {
    underscored: true,
    tableName: 'subject',
    classMethods: {
        associate: function (models) {
            Subject.hasMany(models.GiaResults, {
                as: 'gia_results', foreignKey: 'subject_id'
            });
        }
    }
});

module.exports = Subject;
