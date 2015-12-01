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
            Subject.hasMany(models.GiaResult, {
                as: 'giaResult', foreignKey: 'subject_id'
            });
            Subject.hasMany(models.CityResult, {
                as: 'cityResult', foreignKey: 'subject_id'
            });
        }

    }
});

module.exports = Subject;
