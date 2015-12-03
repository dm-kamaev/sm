var DataType = require('sequelize'),
    db = require.main.require('./app/components/db');

var SchoolUniversity = db.define('SchoolUniversity', {
    schoolId: {
        type: DataType.INTEGER,
        field: 'school_id',
        allowNull: false
    },
    univerId: {
        type: DataType.INTEGER,
        field: 'university_id',
        allowNull: false
    },
    pplCount: {
        type: DataType.INTEGER,
        field: 'ppl_count'
    },
    year: {
        type: DataType.INTEGER,
    },
}, {
    underscored: true,
    tableName: 'school_university',

    classMethods: {
        associate: function (models) {
            SchoolUniversity.belongsTo(models.School, {
                foreignKey: 'school_id'
            });
            SchoolUniversity.belongsTo(models.University, {
                foreignKey: 'university_id'
            });
        }
    }
});

module.exports = SchoolUniversity;
