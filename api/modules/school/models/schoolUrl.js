var DataType = require('sequelize');
var db = require('../../../../app/components/db');

var SchoolUrl = db.define('SchoolUrl', {
    schoolId: {
        type: DataType.INTEGER,
        field: 'school_id'
    },
    url: {
        type: DataType.STRING
    }
}, {
    underscored: true,
    tableName: 'school_url',
    classMethods: {
        associate: function (models) {
            SchoolUrl.belongsTo(models.School, {
                as: 'school', foreignKey: 'school_id'
            });
        }
    }
});

module.exports = SchoolUrl;
