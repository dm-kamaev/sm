var DataType = require('sequelize'),
    db = require('../../../../app/components/db');
const schoolType = require('../enums/schoolType');

var School = db.define('School', {

    /**
     * School info
     */
    name: DataType.STRING,
    abbreviation: DataType.STRING,
    fullName: {
        field: 'full_name',
        type: DataType.STRING
    },
    schoolType: {
        field: 'school_type',
        type: DataType.ENUM,
        values: schoolType.toArray(),
        allowNull: false

    },
    director: DataType.STRING,
    phones: DataType.ARRAY(DataType.STRING),
    site: DataType.STRING,
    govermentKey: {
        field: 'goverment_key',
        type: DataType.INTEGER,
        unique: true,
    },
    cityId: {
        field: 'city_id',
        type: DataType.INTEGER,
    },
    educationInterval: {
        field: 'education_interval',
        type: DataType.ARRAY(DataType.INTEGER)
    },

    /**
     * Scores, ratings, etc
     */
    score: {
        type: DataType.ARRAY(DataType.FLOAT),
    },
    totalScore: {
        type: DataType.FLOAT,
        field: 'total_score',
        notNull: false,
        defaultValue: 0
    },
    rank: {
        type: DataType.INTEGER,
    },
    rankDogm: {
        type: DataType.INTEGER,
        field: 'rank_dogm'
    },
    scoreCount: {
        type: DataType.ARRAY(DataType.INTEGER),
        field: 'score_count'
    },
    reviewCount: {
        type: DataType.INTEGER,
        field: 'review_count'
    },
    views: {
        type: DataType.INTEGER,
        notNull: false,
        defaultValue: 0
    },

    /**
     * Meta
     */
    commentGroupId: {
        type: DataType.INTEGER,
        field: 'comment_group_id'
    },
}, {
    underscored: true,
    tableName: 'school',

    classMethods: {
        associate: function(models) {
            School.hasMany(models.GiaResult, {
                as: 'giaResults', foreignKey: 'school_id',
                onDelete: 'cascade'
            });
            School.hasMany(models.OlimpResult, {
                as: 'olimpResults', foreignKey: 'school_id',
                onDelete: 'cascade'
            });
            School.hasMany(models.EgeResult, {
                as: 'egeResults', foreignKey: 'school_id',
                onDelete: 'cascade'
            });
            School.hasMany(models.SearchData, {
                as: 'searchData', foreignKey: 'school_id',
                onDelete: 'cascade'
            });
            School.hasMany(models.Address, {
                as: 'addresses',
                foreignKey: 'school_id',
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
                foreignKey: 'school_id',
                onDelete: 'cascade'
            });
            School.hasMany(models.Activity, {
                as: 'activites',
                foreignKey: 'school_id'
            });
        }
    }
});

module.exports = School;
