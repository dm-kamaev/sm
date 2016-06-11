var DataType = require('sequelize'),
    db = require('../../../../app/components/db');

var Activity = db.define('Activity', {
    schoolId: {
        type: DataType.INTEGER,
        field: 'school_id'
    },
    direction: DataType.STRING,
    profile: DataType.STRING,
    type: DataType.STRING,
    name: DataType.STRING
}, {
    underscored: true,
    tableName: 'activity',

    classMethods: {
        associate: function(models) {
            Activity.belongsTo(models.School, {
                foreignKey: 'school_id'
            });
        }
    }
});

module.exports = Activity;
