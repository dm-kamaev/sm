var DataType = require('sequelize'),
    db = require.main.require('./app/components/db'),
    enums = require('../enums');

var School = db.define('School', {
    name:DataType.STRING,
    abbreviation:DataType.STRING,
    fullName: {
        field: 'full_name',
        type: DataType.STRING
    },
    schoolType: {
        field: 'school_type',
        type: DataType.ENUM,
        values: enums.schoolType.toArray(),
        allowNull: false

    },
    director: DataType.STRING,
    phones: DataType.ARRAY(DataType.STRING),
    site: DataType.STRING,
    cityId: {
        field: 'city_id',
        type: DataType.INTEGER,
    },
    educationInterval: {
        field: 'education_interval',
        type: DataType.ARRAY(DataType.INTEGER)
    },
    comment_group_id: DataType.INTEGER,
    govermentKey: {
        field: 'goverment_key',
        type: DataType.INTEGER,
        unique: true,
        allowNull: false
    }
}, {
    underscored: true,
    tableName: 'school',

    classMethods: {
        associate: function (models) {
            School.hasMany(models.GiaResult, {
                as: 'giaResults', foreignKey: 'school_id'
            });
            School.hasMany(models.OlimpResult, {
                as: 'olimpResults', foreignKey: 'school_id'
            });
            School.hasMany(models.EgeResult, {
                as: 'egeResults', foreignKey: 'school_id'
            });
            School.hasMany(models.SearchData, {
                as: 'searchData', foreignKey: 'school_id'
            });
            School.hasMany(models.Address, {
                as: 'addresses',
                foreignKey: 'school_id'
            });
            School.belongsTo(models.CommentGroup, {
                foreignKey: 'comment_group_id',
                as: 'commentGroup'
            });
            School.belongsTo(models.City, {
                foreignKey: 'city_id',
                as: 'city'
            });
            School.hasMany(models.SchoolUniversity, {
                as: 'schoolUniversities', foreignKey: 'school_id'
            });
            School.hasMany(models.Rating, {
                as: 'ratings',
                foreignKey: 'school_id'
            });
        }
    }
});

module.exports = School;
